def update_background():
    input_file = 'index.html'
    output_lines = []
    found = False
    
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    for line in lines:
        if '<body' in line:
            # Check for bg-brand-dark (actual) or bg-gray-900 (user mentioned)
            if 'bg-brand-dark' in line:
                line = line.replace('bg-brand-dark', 'bg-white')
                found = True
            if 'bg-gray-900' in line:
                line = line.replace('bg-gray-900', 'bg-white')
                found = True
            output_lines.append(line)
        else:
            output_lines.append(line)
            
    with open(input_file, 'w', encoding='utf-8') as f:
        f.writelines(output_lines)
    
    if found:
        print("Successfully updated body background class to bg-white.")
    else:
        print("Warning: Body tag with expected background class not found.")

if __name__ == '__main__':
    update_background()
