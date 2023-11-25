import utils

DFVille1 = utils.DFVille1
DFVille2 = utils.DFVille2

Liste_Activites = Activites_communes(DFVille1,DFVille2)
Li1, Li2 = repartition_ent(DFVille1,DFVille2)
t1 = int(DFVille1['TXCNU0'].unique()[0])
t2 = int(DFVille2['TXCNU0'].unique()[0])

for exo1 in range(0,10):
    for exo2 in range(0,10):
        for red1 in range(0,2000,100):
            for red2 in range(0,2000,100):
              for type_ent in Liste_Activites:
                L1,L2 = utils.departs_successifs_CA(type_ent,Li1,Li2,t1,t2,DFVille1, DFVille2,red1,red2,exo1,exo2)
                
                

