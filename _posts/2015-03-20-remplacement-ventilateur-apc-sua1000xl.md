---
layout: post
published: false
title: Remplacement ventilateur sur APC SUA1000XL
bigimg: /img/20151228/IMG_4788_DxO-1024x319.jpg
---
A Bali, l'alimentation électrique peut être "aléatoire". Les coupures de courant de plusieurs heures ne sont pas si rares... Autant cela reste romantique de s'éclairer à la bougie en soirée et supportable de vivre sans climatisation, autant une coupure de courant en plein meeting [Zoom](https://zoom.us) lors d'une review avec les collègues a une image [désastreuse](https://i.giphy.com/YHZiT6FLA5cGI.gif#fancy).

Mais l'homme a inventé les onduleurs! Après avoir épluché le site d'APC dans tous les sens, j'ai commandé sur [Lazada](https://www.lazada.co.id/) un [APC SUA1000XL](http://www.apc.com/shop/us/en/products/APC-Smart-UPS-XL-1000VA-USB-Serial-120V/P-SUA1000XL) et sa petite soeur, le pack de batterie [SUA24XLBP](http://www.apc.com/shop/us/en/products/APC-Smart-UPS-XL-24V-Battery-Pack/P-SUA24XLBP). J'installe l'onduleur, branche l'extension puis tout le matériel (routeurs fibre et wimax, switch, Raspberry Pi, écrans et portable) et le management m'annonce fièrement un bon 700 minutes d'autonomie! Je suis joie, je suis bonheur! Je peux attaquer des reviews de 11 heures sans faillir (mais bon, sans la clim, il y'a un petit risque de sudation non négligeable).

Bref. Tout était parfait, la vie était belle, le soleil haut dans le ciel, les oiseaux chantaient sauf que je ne pouvais plus les entendre. En effet les derniers modèles de SUA1000XL sont livrés avec un ventilateur qui doit brasser 20cm³ air/ heure pour environ [250 decibels](https://i.giphy.com/zFBbpsg58QSVq.gif#fancy) (mesuré à l'oreille à 1 mètre). Et il tourne tout le temps. Pas juste en cas de coupure de courant, Tout Le [TEMPS](https://i.giphy.com/xXEI0jqYhz6uI.gif#fancy)! Pour le prix c'est vraiment mesquin de la part d'APC. Tel quel, cet onduleur ne peut pas être placé dans un bureau. Le bourdonnement est sourd, incessant et insupportable.

<iframe width="560" height="315" src="https://www.youtube.com/embed/SYM9NjzHOQ0?rel=0" frameborder="0" allowfullscreen></iframe>

J'ai donc profité d'une visite en France pour commander le parfait nécessaire pour rendre cet onduleur silencieux. Voici la marche à suivre.

![]({{site.baseurl}}/img/20151228/IMG_4779_2_DxO.jpg#nofancy#alignright)
De base, le ventilateur dans l'APC est un [SUNON EE80252B1](http://www.sunon.com/tw/products/pdf/DCFAN/ME8025_U.pdf) de 80x80x25mm avec une tension nominal de 24V. Il est alimenté en 12V en continu et en cas de coupure de courant passe à 24V. Le bruit émis doit correspondre au décollage d'un Rafale à 1 mètre (pour un ordre d'idée). Les ventilateurs silencieux 24V sont introuvables (en tout cas je n'ai rien trouvé sur Amazon) donc l'idée est de prendre un ventilateur de PC réputé comme silencieux et lui associer un régulateur de tension pour faire baisser le 24V et alimenter le ventilateur en continu en 12V.

J'ai donc commandé sur Amazon:

- un ventilateur silencieux [Artic F8](http://www.amazon.fr/gp/product/B002QVFN7G?ref_=pe_386181_51767671_TE_dp_p1) 12V
- et un régulateur de tension [LM2596S](http://www.amazon.fr/dp/B00QFDRR9S/ref=pe_2062881_77686691_tnp_email_TE_Cardp_6)

Avec ces deux éléments, un tournevis et un fer à souder, on est prêt pour le remplacement (et pour la perte de la garantie...)

![1. Voici l'onduleur à démonter]({{site.baseurl}}/img/20151228/IMG_4771_DxO_thumb.jpg)
![2. On commence par débrancher la batterie pour ne pas finir grillé]({{site.baseurl}}/img/20151228/IMG_4772_DxO_thumb.jpg)
![3. On déclipse le panneau avant]({{site.baseurl}}/img/20151228/IMG_4773_DxO_thumb.jpg)
![4. On dévisse le panneau avant]({{site.baseurl}}/img/20151228/IMG_4775_DxO_thumb.jpg)
![5. On débranche le connecteur de la batterie et on la retire]({{site.baseurl}}/img/20151228/IMG_4776_DxO_thumb.jpg)
![6. On peut maintenant faire coulisser la coque vers l'arrière]({{site.baseurl}}/img/20151228/IMG_4779_1_DxO_thumb.jpg)
![7. On dévisse le ventilateur, on note le sens de rotation et on coupe le cable au plus près du ventilateur]({{site.baseurl}}/img/20151228/IMG_4781_DxO_thumb.jpg)
![8. On soude le cable coupé sur l'entrée du régulateur et on règle la tension de sortie à ~12 volts]({{site.baseurl}}/img/20151228/IMG_4782_DxO_thumb.jpg)
![9. On soude le cable du nouveau ventilateur sur la sortie du régulateur (le fil jaune est inutile]({{site.baseurl}}/img/20151228/IMG_4785_DxO_thumb.jpg)
![10. On protège le régulateur dans un emballage professionnel à base de sac en plastique recyclé et de gaffer]({{site.baseurl}}/img/20151228/IMG_4787_DxO_thumb.jpg)
![11. On place le ventilateur sur le support et on le revisse]({{site.baseurl}}/img/20151228/IMG_4789_DxO_thumb.jpg)
![12. On peut faire passer le régulateur par le haut de l'onduleur pour le poser sur les batteries. Cela permet de modifier la tension plus tard sans tout redémonter]({{site.baseurl}}/img/20151228/IMG_4792_DxO_thumb.jpg)
![13. On a plus qu'a remettre la coque et la face avant]({{site.baseurl}}/img/20151228/IMG_4793_DxO_thumb.jpg)
