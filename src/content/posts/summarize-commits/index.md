---
title: Summarizing commit history
date: 2024-07-12
description: I wanted to review what I worked on for the last decade, so I wrote a script to read all 13000 commits.
published: true
---
I wanted to review what I worked on for the last decade, so I wrote a script to read all 13000 commits.

This was the script. It requires datasette [llm](https://llm.datasette.io/en/stable/) cli

A year was a convenient granularity between quantity of commits and granularity of summary. This uses macos date and grep utilities

```bash
# #!/bin/sh

# Run the command and store the output in a temporary file
git log --author="adrian" --pretty=format:"%ad - %s" --date=short --reverse | grep -v '\[Gitlab CI\]' > temp_output.txt

# Split the temporary file into chunks of 100 lines each
split -l 250 temp_output.txt chunk_

# Loop through the chunk files and process each chunk
for chunk_file in chunk_*
do
    first_date=$(head -n 1 "$chunk_file" | cut -d' ' -f1)
    last_date=$(tail -n 1 "$chunk_file" | cut -d' ' -f1)
    echo "Processing from $first_date to $last_date"
    
    echo "## $first_date - $last_date" | tee -a log-file.md
    cat $chunk_file | llm "These are all commits I worked on from $first_date to $last_date. Make a paragraph summary of the changes made over that duration:\n\n\$input\n\nYou are continuing this file:\n\n$(cat log-file.md)" | tee -a log-file.md
done

# Clean up the temporary files
rm temp_output.txt chunk_*
```


