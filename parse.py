import sys

def parse_line(line):
    # broken
    """ parses a line of text into it's comma separated parts """
    in_quotes = False
    so_far = ''

    parts = []

    for char in line:
        if in_quotes:
            if char == '"':
                in_quotes = False
            else:
                so_far += char
        else:
            if char == ',':
                parts += [ so_far ]
                so_far = ''
            elif char == '"':
                in_quotes = True
            else: 
                so_far += char

    return parts

def parse_students(file, Student):
    """
    parses a csv file into a osis #'s mapped to students
    
    file - 
        file in a csv format to read from
    
    Student - 
        a student class to interface with the data on each line.

    return a map of osis #'s to student objects
    """
    students = {}

    #skip first line
    if not file.readline(): 
        raise ValueError("file object is empty")
    
    # read rest of lines and map them to keys
    for line in file:
        # parse line and create a student
        parsed = parse_line(line)
        student = Student(parsed)

        if student.osis in students:
            print(f"[WARNING]: duplicate osis {student.osis}, discarding \"{'line'}\"", file=sys.stderr)
        students[student.osis] = student

    return students
