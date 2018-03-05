---
layout: post
published: true
title: Driving your 3D printer using PSU Control
tags: [3dprinter, octoprint]
---

I'm the proud owner of a FDM 3D printer Anycubic i3 Mega. Even before receiving my printer,
I was playing with the [OctoPi](https://octoprint.org/download/) distribution on a
Raspberry Pi and I started to investigate the existing plugins.

[PSU Control](https://plugins.octoprint.org/plugins/psucontrol/) is an awesome plugin which is able to control
your printer power supply from the OctoPrint web interface. To achieve that, you have to drive a relay
module using a RPi GPIO output.

I already own a relay module and the project is only to build the required electronics and to create a small
enclosure to protect the board.

Here is how the result looks like
![Cable and enclosure]({{site.baseurl}}/img/20180302/20180302_124742106_iOS_DxO_thumb.jpg)
![Module plugged in]({{site.baseurl}}/img/20180302/20180302_123628507_iOS_DxO_thumb.jpg)


------------------------------------------------------------------------------------------


### Electronics

![Relay pinout]({{site.baseurl}}/img/20180302/TWLit_thumb.jpg#alignright)
The relay module already contains some components to drive it and we don't need lot of current but this module has
to be powered with 5V and GPIOs on the Raspberry Pi use 3.3V.
We have to setup a small board to trigger the relay properly.

|                            | NC state | NO state |
|----------------------------|----------|----------|
| Relay not powered up       | Closed   | Open     |
| In pin floating            | Closed   | Open     |
| In pin connected to Vcc    | Closed   | Open     |
| In pin connected to Ground | Open     | Closed   |

The idea is to use NC pins so the relay will act like a closed switch in all scenarios
(RPi offline, GPIO not connected..) except when the GPIO drives the In pin to ground.

We need the following parts:
* Relay module (similar to JQC-3FF-S)
* Small PCB
* Standard NPN transistor (2N2222...)
* Resistor (between 1KΩ and 20KΩ should be ok)

![Breadboard]({{site.baseurl}}/img/20180302/psucontrol_bb_thumb.jpg)
The value of the resistor is not really important and is dependant of the transistor you use (the hFE value).
The standard formula to find the correct value is as follow.
![Schematic]({{site.baseurl}}/img/20180302/psucontrol_schematic_thumb.png)
Ic = 0.005A (it's the current required to trigger the relay)
Ib = Ic / hFE = 0.005 / ~200 = 0.000025 (it's the minimal current required to saturate the transistor, hFE ~200 for 2N2222)
To be confortable, we can decide Ib = 0.0001A

Finaly R = (Vin - Vbe) / Ib = (3.3 - 0.7) / 0.0001 = 26000Ω = 26KΩ (Vbe is the voltage drop from the transitor)

I built this design on the smallest possible PCB and soldered it directly on the relay module (the most dirty way).

![PCB and relay module]({{site.baseurl}}/img/20180302/20180301_084419752_iOS_DxO_thumb.jpg)

### Enclosure

As we're playing with AC high voltage, we need to protect this board from any external event (like my children).
Using [Fusion 360](https://www.autodesk.com/products/fusion-360/overview), I designed a small enclosure
to protect the board. It's a bit tight but everything fits properly on it.

<iframe src="https://myhub.autodesk360.com/ue2aedb11/shares/public/SHabee1QT1a327cf2b7abdb08b9862ceddaf?mode=embed" width="700" height="600" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"  frameborder="0"></iframe>
STL files: [Bottom]({{site.baseurl}}/img/20180302/relay_bottom.stl) / [Top]({{site.baseurl}}/img/20180302/relay_top.stl)

![Module fits into enclosure]({{site.baseurl}}/img/20180302/20180301_084735805_iOS_DxO_thumb.jpg)


Then I cut the power outlet, inserted the two cords into the enclosure and did the
appropriate connections on COM and NC pins.

![Module with connections done]({{site.baseurl}}/img/20180302/20180301_091810924_iOS_DxO_thumb.jpg)

![Sealed!]({{site.baseurl}}/img/20180302/20180301_091907124_iOS_DxO_thumb.jpg)

### PSU Control

![PSU Control configuration]({{site.baseurl}}/img/20180302/chrome_2018-03-02_14-01-08_thumb.jpg)
