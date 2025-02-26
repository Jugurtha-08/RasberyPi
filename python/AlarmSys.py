from gpiozero import LED , Button as btnZ
from tkinter import *
from tkinter import  Button as btnK
import requests
import sevenseg
 
class AlarmSys:
    def __init__(self, z1, z2, z3, z4, on_off, reset, alarme,
                 lblz1, lblz2, lblz3, lblz4, lbl_on_off,
                 pa, pb, pc, pd, pe, pf, pg, ppd, type):
 
        self.__z1 = btnZ(z1)
        self.__z2 = btnZ(z2)
        self.__z3 = btnZ(z3)
        self.__z4 = btnZ(z4)
        self.__reset = btnZ(reset)
        self.__on_off = btnZ(on_off)
 
        self.juju ={"statut" : 0, "z1" : 0, "z2" : 0, "z3" : 0,  "z4" : 0}
        
        self.__Root = Tk()
        self.__Root.title("Alarm System")
 
        self.__lblz1 = Label(self.__Root, text=lblz1, bg="blue")
        self.__lblz2 = Label(self.__Root, text=lblz2, bg="blue")
        self.__lblz3 = Label(self.__Root, text=lblz3, bg="blue")
        self.__lblz4 = Label(self.__Root, text=lblz4, bg="blue")
        self.__lbl_on_off = Label(self.__Root, text=lbl_on_off, bg="blue")
 
        
        self.__activate = btnK(self.__Root, text="Activate", command=self.__Activate, bg="orange")
        self.__deactivate = btnK(self.__Root, text="Deactivate", command=self.__Deactivate, bg="orange")
        self.__resetTk = btnK(self.__Root, text="Reset", command=self.__Reset, bg="orange")
 
        
        self.__alarme = LED(alarme)
 
        
        self.__pa = pa
        self.__pb = pb
        self.__pc = pc
        self.__pd = pd
        self.__pe = pe
        self.__pf = pf
        self.__pg = pg
        self.__ppd = ppd
        self.__type = type
 
        self.__afficheur = sevenseg.sevenseg(self.__pa, self.__pb, self.__pc, self.__pd, self.__pe, self.__pf, self.__pg, self.__ppd, self.__type)
        self.__afficheur.Show0()
 
        self.systemStatus = 0
 
        self.__z1.when_pressed = lambda: self.__check_z1_z2_z3_z4(1)
        self.__z2.when_pressed = lambda: self.__check_z1_z2_z3_z4(2)
        self.__z3.when_pressed = lambda: self.__check_z1_z2_z3_z4(3)
        self.__z4.when_pressed = lambda: self.__check_z1_z2_z3_z4(4)
        self.__on_off.when_pressed = self.__Activate
        self.__reset.when_pressed = self.__Reset
 
        self.__lblz1.grid(row=0, column=0)
        self.__lblz2.grid(row=0, column=1)
        self.__lblz3.grid(row=1, column=0)
        self.__lblz4.grid(row=1, column=1)
        self.__lbl_on_off.grid(row=2, column=0, columnspan=2, padx=10, pady=10)
        self.__activate.grid(row=0, column=2, padx=10, pady=10)
        self.__deactivate.grid(row=1, column=2, padx=10, pady=10)
        self.__resetTk.grid(row=2, column=2, padx=10, pady=10)
 
        self.__Root.mainloop()
 
    def __Activate(self):

        if self.systemStatus == 0:
            self.__afficheur.count_up()
            self.__afficheur.ShowA()
            self.systemStatus = 1
            self.__alarme.off()
            self.__lbl_on_off.config(bg="green")
            self.juju = {"statut" : 1, "z1" : 0, "z2" : 0, "z3" : 0,  "z4" : 0}
                      
            try:
                res = requests.post('http://10.1.8.56:3000/activate', json=self.juju)
                if res.status_code == 200:
                    print("ACTIVATED")

                else:
                    print("NOT ACTIVATED")

            except  requests.exceptions.ConnectionError as e :
                print(e) 
                
                pass
        elif self.systemStatus == 1 :
            self.__afficheur.count_down()
            self.__afficheur.Show0()
            self.systemStatus = 0
            self.__alarme.off()
            self.__lbl_on_off.config(bg="red")
 
    def __Deactivate(self):
        if self.systemStatus == 1:
            self.__afficheur.count_down()
            self.__afficheur.Show0()
            self.systemStatus = 0
            self.__alarme.off()
            self.__lbl_on_off.config(bg="red")

            self.juju = {"statut" : 0, "z1" : 0, "z2" : 0, "z3" : 0,  "z4" : 0}

            try:
                res = requests.post('http://10.1.8.56:3000/deactivate', json=self.juju)
                if res.status_code == 200:
                    print("DEACTIVATED")

                else:
                    print("NOT DEACTIVATED")

            except  requests.exceptions.ConnectionError as e :
                print(e) 
                
                pass
 
    def __check_z1_z2_z3_z4(self, zone):
        if self.systemStatus == 1:
            self.show_zone(zone)
            self.__alarme.blink(on_time=0.5, off_time=0.5)
            self.__set_zone_color(zone, "red")
 
    def show_zone(self, zone):
        if zone == 1:
            self.__afficheur.Show1()
        elif zone == 2:
            self.__afficheur.Show2()
        elif zone == 3:
            self.__afficheur.Show3()
        elif zone == 4:
            self.__afficheur.Show4()
 
    def __set_zone_color(self, zone, color):
        if zone == 1:
            self.__lblz1.config(bg=color)
        elif zone == 2:
            self.__lblz2.config(bg=color)
        elif zone == 3:
            self.__lblz3.config(bg=color)
        elif zone == 4:
            self.__lblz4.config(bg=color)
 
    def __Reset(self):
        self.__alarme.off()
    
        self.__reset_zone_colors()

        self.juju = {"statut" : 1, "z1" : 0, "z2" : 0, "z3" : 0,  "z4" : 0}

        try:
            res = requests.post('http://10.1.8.56:3000/reset', json=self.juju)
            if res.status_code == 200:
                print("RESET")

            else:
                print("NOT RESET")

        except  requests.exceptions.ConnectionError as e :
            print(e) 
                
            pass
 
    def __reset_zone_colors(self):
        self.__lblz1.config(bg="blue")
        self.__lblz2.config(bg="blue")
        self.__lblz3.config(bg="blue")
        self.__lblz4.config(bg="blue")
 