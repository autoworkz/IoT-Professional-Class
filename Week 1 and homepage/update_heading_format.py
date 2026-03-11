
with open('index.html', 'r') as f:
    content = f.read()

# Target the specific h2 block
old_block = """<h2 class="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-primary text-white text-sm">1</span>
                                In-Class Activity Steps
                            </h2>"""

# New block with dark blue text and line break
# Using text-brand-dark for dark blue as defined in tailwind config
# Added <br> for the line break
# Adjusted flex alignment to ensure it looks good with multi-line text
new_block = """<h2 class="text-2xl font-bold text-brand-dark flex items-start gap-3">
                                <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-primary text-white text-sm mt-1">1</span>
                                <div>
                                    In-Class Activity<br>
                                    Steps
                                </div>
                            </h2>"""

if old_block in content:
    content = content.replace(old_block, new_block)
    with open('index.html', 'w') as f:
        f.write(content)
    print("Successfully updated heading format.")
else:
    print("Could not find the target block.")
