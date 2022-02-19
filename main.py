from parse import parse_students, parse_line
import sys
import time

def is_valid(osis):
    return len(osis)==9 and osis.isdigit()

class Student:
    def __init__(self, args):
        self.name = f'{args[1].strip()} {args[2].strip()}'
        self.osis = args[5].strip()

    def __str__(self):
        return self.name

class NewStudent:
    def __init__(self, fname, sname, osis):
        self.name = fname + ' ' + sname
        self.osis = osis

    def __str__(self):
        return self.name

def mark_present(student):
    print(f"{student},{student.osis},{time.time()}")
    print(f"Marked {student} present", file=sys.stderr)

if __name__ == "__main__":
    readpath = sys.argv[1]

    readfile = open(readpath, "r")
    students = parse_students(readfile, Student)

    while True:
        line = sys.stdin.readline()
        if not line: break

        osis = line.strip()
        if not is_valid(osis):
            print(f'"{osis}" is not a valid OSIS, try the other side of the card', file=sys.stderr)
            continue
            
        if osis in students:
            mark_present(students[osis])
        else:
            # get the name of a new student
            print(f"{osis} not associated with a student!", file=sys.stderr)
            print(f"Enter a first name: ", file=sys.stderr)
            fname = input()
            print(f"Enter a second name: ", file=sys.stderr)
            sname = input()
    
            new_student = NewStudent(fname, sname, osis)
            students[osis] = new_student
            mark_present(new_student)    

    readfile.close()