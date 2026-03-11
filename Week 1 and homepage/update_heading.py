
with open('index.html', 'r') as f:
    content = f.read()

old_block = """<h2 class="text-2xl font-bold text-white flex items-center gap-3">
                                <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-primary text-white text-sm">1</span>
                                Activity Steps
                            </h2>"""

new_block = """<h2 class="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-primary text-white text-sm">1</span>
                                In-Class Activity Steps
                            </h2>"""

if old_block in content:
    content = content.replace(old_block, new_block)
    with open('index.html', 'w') as f:
        f.write(content)
    print("Successfully updated heading.")
else:
    print("Could not find the target block.")
    # Fallback: try finding just the line with text-white if indentation matches slightly differently, 
    # but based on the read output, it should match.
