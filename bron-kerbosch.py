graph = [[0,1,0,0,1,0],[1,0,1,0,1,0],[0,1,0,1,0,0],[0,0,1,0,1,1],[1,1,0,1,0,0],[0,0,0,1,0,0]]

def N(vertex):
    c = 0
    l = []
    for i in graph[vertex]:
        if i is 1 :
         l.append(c)
        c+=1   


    return l 


def bronk(r,p,x):
    if len(p) == 0 and len(x) == 0:
        print r
        return

    for vertex in p[:]:
        r_new = r[::]
        r_new.append(vertex)
        p_new = [val for val in p if val in N(vertex)]
        x_new = [val for val in x if val in N(vertex)]
        bronk(r_new,p_new,x_new)
        p.remove(vertex) #poistaa sen arraysta
        x.append(vertex)

    bronk([], [0,1,2,3,4,5], [])
