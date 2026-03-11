from bs4 import BeautifulSoup
import os

def update_status_message():
    file_path = 'index.html'
    
    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found.")
        return

    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    soup = BeautifulSoup(content, 'html.parser')
    
    # Find the completion label
    completion_label = soup.find(id='completion-label')
    
    if completion_label:
        old_text = completion_label.get_text(strip=True)
        print(f"Found label with text: '{old_text}'")
        
        new_text = "Assignment Incomplete: Finish all 6 steps"
        completion_label.string = new_text
        
        print(f"Updating text to: '{new_text}'")
        
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(str(soup))
        print("Successfully updated and saved index.html")
    else:
        print("Error: Could not find element with id 'completion-label'")

if __name__ == "__main__":
    update_status_message()
