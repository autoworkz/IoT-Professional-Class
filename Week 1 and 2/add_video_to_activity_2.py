import os

file_path = 'index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Define the HTML for the new video
new_video_html = """
                    <!-- Video Section 2 -->
                    <div class="mt-8 animate-on-scroll">
                        <div class=" mx-auto bg-brand-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                            <div class="p-4 border-b border-white/10 bg-brand-dark/50 flex items-center justify-between">
                                <h3 class="font-semibold text-white flex items-center gap-2">
                                    <i data-lucide="play-circle" class="w-5 h-5 text-brand-primary"></i>
                                    Watch: Senseii Games Walkthrough
                                </h3>
                            </div>
                            <div class="relative pb-[56.25%] h-0 bg-black">
                                <iframe class="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/9AsqmGTAxmY" title="Senseii Games Walkthrough" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>"""

# Locate the insertion point
# We want to insert it before the closing </section> of id="activity-steps-2"
# The section starts at id="activity-steps-2"
start_marker = '<section id="activity-steps-2"'
start_index = content.find(start_marker)

if start_index != -1:
    # Find the closing </section> after this start index
    end_section_index = content.find('</section>', start_index)
    
    if end_section_index != -1:
        # We want to insert before the last closing </div> inside this section
        # Actually, looking at the file structure:
        # The steps are in <div class="space-y-4"> ... </div>
        # We should insert AFTER that closing div, but BEFORE </section>
        
        # Let's find the content up to the closing section tag
        section_content = content[start_index:end_section_index]
        
        # The steps container is the last div closing before the section closes
        # But to be safe, let's look for the specific comment of the last step to orient ourselves
        last_step_marker = '<!-- Step 3: Track Progress -->'
        last_step_index = content.find(last_step_marker, start_index)
        
        if last_step_index != -1:
            # Find the closing div of the steps container (space-y-4)
            # It should be the first </div> after the last step's content
            # The last step has a </div> for its content, then a </div> for the step-card, then the </div> for space-y-4
            
            # Let's find the closing tag of the space-y-4 div
            # We can find the </div> that closes the space-y-4 div by looking for the next </div> that is followed by </section> (ignoring whitespace)
            
            # Simplified approach: Insert right before </section>
            # The existing code has the steps div closing right before </section>
            # So inserting before </section> will put it after the steps div
            
            new_content = content[:end_section_index] + new_video_html + '\n\n' + content[end_section_index:]
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print("Successfully added video to Activity 2 section.")
        else:
            print("Error: Could not find last step marker.")
    else:
        print("Error: Could not find closing </section> tag for Activity 2.")
else:
    print("Error: Could not find Activity 2 section.")
