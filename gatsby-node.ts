import path from "path";
import { GatsbyNode, CreatePagesArgs, CreatePageArgs } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  getNode,
  actions,
}) => {
  if (node.internal.type === "MarkdownRemark") {
    const relativeFilePath = createFilePath({
      node,
      getNode,
    });

    actions.createNodeField({
      name: "slug",
      node,
      value: `p${relativeFilePath}`,
    });
  }
};

export const createPages: GatsbyNode["createPages"] = async function createPages(
  args
) {
  await createBlogs(args);
  await createBlogList(args);
};

async function createBlogList({
  graphql,
  actions: { createPage },
}: CreatePagesArgs & {
  traceId: "initial-createPages";
}) {
  const blogList = path.resolve(`${__dirname}/src/templates/BlogListPage.tsx`);
  const totalBlogsData = await graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
  `);
  const pageSizeResponse = await graphql(`
    {
      site {
        siteMetadata {
          pageSize
        }
      }
    }
  `);
  const pageSize = (pageSizeResponse.data as any).site.siteMetadata
    .pageSize as number;
  const blogCount = (totalBlogsData.data as any).allMarkdownRemark.edges.length;
  const pageCount = Math.ceil(blogCount / pageSize);
  for (let i = 0; i < pageCount; i++) {
    console.log("create page " + (i + 1) + " of " + pageCount);
    if (i === 0) {
      createPage({
        path: `/`,
        component: blogList,
        context: {
          page: i,
          skip: i * pageSize,
          limit: pageSize,
        },
      });
    }
    createPage({
      path: `posts/${i}`,
      component: blogList,
      context: {
        page: i,
        skip: i * pageSize,
        limit: pageSize,
      },
    });
  }
}

async function createBlogs({
  graphql,
  actions: { createPage },
}: CreatePagesArgs & {
  traceId: "initial-createPages";
}) {
  const blogPost = path.resolve(`${__dirname}/src/templates/BlogPostPage.tsx`);
  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
