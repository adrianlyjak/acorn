import path from "path";
import { GatsbyNode, CreatePagesArgs } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";

const gatsbyNode: GatsbyNode = {
  onCreateNode({ node, getNode, actions }) {
    if (node.internal.type === "MarkdownRemark") {
      const value = createFilePath({ node, getNode });
      actions.createNodeField({
        name: "slug",
        node,
        value,
      });
    }
  },
  async createPages(args) {
    await createBlogs(args);
  },
};

async function createBlogs({
  graphql,
  actions: { createPage },
}: CreatePagesArgs & {
  traceId: "initial-createPages";
}) {
  const blogPost = path.resolve(`${__dirname}/../src/templates/BlogPost.tsx`);
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  );
  if (result.errors) {
    throw result.errors;
  }
  // Create blog posts pages.
  const posts = (result.data as any).allMarkdownRemark.edges as any[];

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });
}

export default gatsbyNode;
