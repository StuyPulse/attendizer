import sys
fin = open(sys.argv[1])
for line in fin:
    print(line.split(',')[0])
fin.close()