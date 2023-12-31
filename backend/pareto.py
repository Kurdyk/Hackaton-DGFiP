import utils

DFVille1 = utils.DFVille1
DFVille2 = utils.DFVille2

Liste_Activites = ['4673A','9602A','5610C','6190Z','4321A','7022Z','6420Z','4399C','86901','4789Z','4520A','4511Z','4799A','7010Z','99990']

Li1, Li2 = utils.repartition_ent(DFVille1,DFVille2)
t1 = int(DFVille1['TXCNU0'].unique()[0])
t2 = int(DFVille2['TXCNU0'].unique()[0])

PF1 = 0
PF2 = 0

dict_bases = {}
    
for ent in DFVille1['NCCO']:
    b1,b2 = utils.base_brute_CA(ent,DFVille1,'154','166', utils.DFA1f)
    dict_bases[ent] = (b1,b2)

for ent in DFVille2['NCCO']:
    b1,b2 = b1,b2 = utils.base_brute_CA(ent,DFVille2,'154','166', utils.DFA1f)
    dict_bases[ent] = (b1,b2)


def find_pareto():

    T = []
    dict_config = {}

    for exo1 in range(0, 100, 10):
        print('pass')
        for exo2 in range(0, 100, 10):
            for red1 in range(0, 600, 100):
                for red2 in range(0, 600, 100):
                    PF1 = 0
                    PF2 = 0

                    for type_ent in Liste_Activites:
                        L1,L2 = utils.departs_successifs_CA(type_ent,Li1,Li2,t1,t2,DFVille1, DFVille2,red1,red2,exo1,exo2)
                        for ent in L1 :
                            if ent[1]==type_ent:
                                b1 = int(dict_bases[ent[0]][0])
                                b1 = min((b1-red1) * ((100-exo1) / 100), b1-red1)
                                PF1+= b1*t1
                    
                        for ent in L2 :
                            if ent[1]==type_ent:
                                b2 = int(dict_bases[ent[0]][1])
                                b2 = min((b2-red2) * ((100-exo2) / 100), b2-red2)
                                PF2 += b2*t2
                        dict_config[type_ent] = [red1,red2,exo1,exo2]
                    T.append([PF1,PF2, dict_config])
    opt = T[0][0] + T[0][1] 
    iopt = 0
    for i in range(len(T)): 
        if T[i][0] + T[i][1] > opt:
            iopt = i

    Optimum = T[iopt]
    return Optimum

if __name__ == "__main__":
    print(find_pareto())
