sudo hciconfig hci0 up

sudo hciconfig hci0 leadv 3

sudo hcitool -i hci0 cmd 0x08 0x0008 1b 02 01 06 03 03 aa fe 13 16 aa fe 10 00 03 67 6f 6f 2e 67 6c 2f 41 71 31 38 7a 46 00 00 00 00
