def revert_background():
    input_file = 'index.html'
    output_lines = []
    found = False
    
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    for line in lines:
        if '<body' in line and 'bg-white' in line:
            line = line.replace('bg-white', 'bg-brand-dark')
            found = True
            output_lines.append(line)
        else:
            output_lines.append(line)
            
    with open(input_file, 'w', encoding='utf-8') as f:
        f.writelines(output_lines)
    
    if found:
        print("Successfully reverted body background to bg-brand-dark.")
    else:
        print("Warning: Body tag with bg-white not found.")

if __name__ == '__main__':
    revert_background()
