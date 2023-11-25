import utils

DFVille1 = utils.DFVille1
DFVille2 = utils.DFVille2

Liste_Activites = Activites_communes(DFVille1,DFVille2)
Li1, Li2 = repartition_ent(DFVille1,DFVille2)
t1 = int(DFVille1['TXCNU0'].unique()[0])
t2 = int(DFVille2['TXCNU0'].unique()[0])

PF1 = 0
PF2 = 0

T = []

for exo1 in range(0,10):
    for exo2 in range(0,10):
        for red1 in range(0,2000,100):
            for red2 in range(0,2000,100):
              for type_ent in Liste_Activites:
                L1,L2 = utils.departs_successifs_CA(type_ent,Li1,Li2,t1,t2,DFVille1, DFVille2,red1,red2,exo1,exo2)
                for ent in L1 :
                    if ent[1]==type_ent:
                        b1 = int(dict_bases[ent[0]][0])
                        b1 = min((b1-red1) * (1-exo1), b1-red1)
                        PF1+= b1*t1
            
                for ent in L2 :
                    if ent[1]==type_ent:
                        b2 = int(dict_bases[ent[0]][1])
                        b2 = min((b2-red2) * (1-exo2), b2-red2)
                        PF2 += b2*t2
                T.append([PF1,PF2,red1,red2,exo1,exo2])
opt = T[0][0] + T[0][1] 
iopt = 0
for i in range(len(T)): 
    if T[i][0] + T[i][1] > opt:
        iopt = i
print(T[iopt])
                
