---
layout: post
published: true
title: Custom board and enclosure for OctoPrint PSUControl plugin
tags: [3dprinter, octoprint]
---

I'm the proud owner of a FDM 3D printer Anycubic i3 Mega. Even before receiving my printer,
I was playing with the [OctoPi](https://octoprint.org/download/) distribution on a
Raspberry Pi and I started to investigate the existing plugins.

[PSUControl](https://plugins.octoprint.org/plugins/psucontrol/) is an awesome plugin using rPI GPIO
to control a relay and manage printer power supply.

I'll explain below how to build the hardware required to control any printer power supply.

------------------------------------------------------------------------------------------

### Design

The relay module is powered with 5V but the GPIOs on the Raspberry Pi use 3.3V. We have to setup
a small board to trigger the relay properly.

![Breadboard]({{site.baseurl}}/img/20180302/psucontrol_bb_thumb.jpg)

I built this design on the smallest possible PCB and soldered it directly on the relay module (on the most dirty way).

![PCB and relay module]({{site.baseurl}}/img/20180302/20180301_084419752_iOS_DxO_thumb.jpg)

### Enclosure

As we're playing with AC high voltage, we need to protect this board from any external event (like my children).
Using [Fusion 360](https://www.autodesk.com/products/fusion-360/overview), I designed a small enclosure
to protect the board. It's a bit tight but everything fits properly on it.

<iframe src="https://myhub.autodesk360.com/ue2aedb11/shares/public/SHabee1QT1a327cf2b7abdb08b9862ceddaf?mode=embed" width="700" height="600" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"  frameborder="0"></iframe>

STL files: [Bottom]({{site.baseurl}}/img/20180302/relay_bottom.stl)) / [Top]({{site.baseurl}}/img/20180302/relay_top.stl))

![Module fits into enclosure]({{site.baseurl}}/img/20180302/20180301_084735805_iOS_DxO_thumb.jpg)


Then I cut the power outlet, inserted the two cords into the enclosure and did the
appropriate connections.

![Module with connections done]({{site.baseurl}}/img/20180302/20180301_091810924_iOS_DxO_thumb.jpg)

![Sealed!]({{site.baseurl}}/img/20180302/20180301_091907124_iOS_DxO_thumb.jpg)

### PSUControl

With this setup, the relay is closed if there is no power supply
on Raspberry side so you can print even with the rPI off.

![PSUControl configuration]({{site.baseurl}}/img/20180302/chrome_2018-03-02_14-01-08_thumb.jpg)
