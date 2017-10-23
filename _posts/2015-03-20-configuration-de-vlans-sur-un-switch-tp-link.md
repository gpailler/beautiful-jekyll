---
layout: post
published: false
title: Configuration de VLANs sur un switch Tp-Link
---
À Bali, j’utilise en fournisseur d’accès Internet principal le provider Neuviz. Celui-ci fourni un routeur et peut faire de l’administration à distance dessus. Malgré ma totale confiance, je ne veux pas que Neuviz ai un accès direct aux machines du LAN. J’utilise donc un Raspberry Pi comme routeur intermédiaire.

Comme le Raspberry Pi n’a qu’une seule carte réseau, on va jouer avec les VLANs sur le switch pour faire deux réseaux : Neuviz <-> Raspberry Pi et Raspberry Pi <-> LAN. J’utilise un switch Tp-Link [TL-SG108E](http://www.tp-link.com/lk/products/details/?model=TL-SG108E) que j’ai rapporté d’une escapade à l’étranger.

```
        /-------------------------------------------------\
        | +---+ +---+ +---+ +---+ +---+ +---+ +---+ +---+ |
        | | 1 | | 2 | | 3 | | 4 | | 5 | | 6 | | 7 | | 8 | | <-- Ceci est un switch
        | +---+ +---+ +---+ +---+ +---+ +---+ +---+ +---+ |
        \-------------------------------------------------/
Reseau    {  Neuviz } {          Lan              } {RPi}
VLAN      {2,4} {2,4} {3,4} {3,4} {3,4} {3,4} {3,4} {2,3,4}
PVID      { 2 } { 2 } { 3 } { 3 } { 3 } { 3 } { 3 } { 4 }
```

####Configuration

- On va sur le site de TP-Link et on récupère et on installe l’utilitaire de configuration [Easy Smart Configuration Utility](http://www.tp-link.com/lk/products/details/?model=TL-SG108E).
- On se logue (admin/admin) sur le switch et on fait tout de suite une petite update de firmware pour s’échauffer.
- On change son mot passe.
- On change l’IP du switch pour 192.168.5.254.



![Changement du mot de passe](![Easy_Smart_Configuration_Utility_2015-02-27_14-09-39.png]({{site.baseurl}}/img/Easy_Smart_Configuration_Utility_2015-02-27_14-09-39.png)
/content/images/2016/10/Easy_Smart_Configuration_Utility_2015-02-27_14-09-39.png?w=512)
![Changement de l'IP](/content/images/2016/10/Easy_Smart_Configuration_Utility_2015-02-27_16-23-02.png?w=512)

- On configure les VLANs et les PVID de la façon suivante

![Configuration des VLANs](/content/images/2016/10/Easy_Smart_Configuration_Utility_2015-02-27_15-31-50.png?w=512)
![Configuration des PVID](/content/images/2016/10/Easy_Smart_Configuration_Utility_2015-02-27_15-30-43.png?w=512)

####Quelques détails
- La notion de port tagged ou untagged concerne le trafic sortant du switch.
- Si le port est tagged, cela veut dire que l’ID du VLAN est passé dans la trame et que l’équipement branché sur le port est capable d’interpréter cette information (autre switch, PC). Dans mon cas, je considère que aucun équipement n’est compatible et c’est le switch qui fait tout le travail.
- La notion de PVID concerne le trafic entrant dans le switch. Une trame untagged entrant dans le switch sera mise dans le VLAN spécifié par le PVID.


####Comment ça marche?
Le routeur Neuviz (port 1, VLAN 2 et 4, PVID 2) envoie une trame. Le switch la reçoit et applique le PVID 2. La trame se trouve donc dans le VLAN 2. Seul les ports 1,2 et 8 sont dans ce VLAN donc le trame se sort que sur ces ports. Le Raspberry Pi (port 8) reçoit la trame et répond. La trame est marquée avec le PVID 4 et comme tous les ports sont dans le VLAN 4, le routeur Neuviz reçoit la réponse.
