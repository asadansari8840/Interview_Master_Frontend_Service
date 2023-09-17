export const getFileNameByDateTime = () => {
    const timeObj = {
        '00': '12-AM',
        '01': '01-AM',
        '02': '02-AM',
        '03': '03-AM',
        '04': '04-AM',
        '05': '05-AM',
        '06': '06-AM',
        '07': '07-AM',
        '08': '08-AM',
        '09': '09-AM',
        '10': '10-AM',
        '11': '11-AM',
        '12': '12-PM',
        '13': '01-PM',
        '14': '02-PM',
        '15': '03-PM',
        '16': '04-PM',
        '17': '05-PM',
        '18': '06-PM',
        '19': '07-PM',
        '20': '08-PM',
        '21': '09-PM',
        '22': '10-PM',
        '23': '11-PM',
    };

    const date = new Date();
    const fullDateArr = Date().split(' ');
    const time = fullDateArr[4].split(":");
    let formatTime = timeObj[time[0]];
    const formattedName = `Contact_Export_Excel_Sheet_${fullDateArr[2]}_${fullDateArr[1]}_${fullDateArr[3]}_at_${formatTime.split("-")[0]}:${time[1]}_${formatTime.split("-")[1]}.xlsx`;
    return formattedName;
}

