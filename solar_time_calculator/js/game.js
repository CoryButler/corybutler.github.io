export default function Game ()
{
    let body = document.getElementsByTagName("body")[0];

    fetch("./data.json")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setUp(data);
        });

    const setUp = (data) => {
        let container = document.createElement("div");
        container.className = "container";

        let input = document.createElement("div");
        input.className = "input";

        let output = document.createElement("div");
        output.className = "output";

        data.cards.forEach(c => {
            let card = document.createElement("div");
            card.className = "card";

            let label = document.createElement("h3");
            label.innerHTML = c.name + ":";
            
            let fields = document.createElement("div");
            fields.className = "fields";

            c.fields.forEach(f => {
                let select = document.createElement("select");
                select.id = f.id;
                select.addEventListener("change", calc);

                if (f.options) {
                    f.options.forEach(o => {
                        let option = document.createElement("option");
                        option.innerHTML = o;

                        select.appendChild(option);
                    });
                    if (f.id === "month") {
                        select.selectedIndex = new Date().getMonth();
                    }
                    else if (f.id === "meridian") {
                        let hour = new Date().getHours();
                        select.selectedIndex = hour < 12 ? 0 : 1;
                    }
                    else if (f.id === "timeZone") {
                        let zone = 0;
                        let minFromUtc = new Date().getTimezoneOffset();
                        if (minFromUtc <= 300) {
                            zone = 0;
                        }
                        else if (minFromUtc === 360) {
                            zone = 1;
                        }
                        else if (minFromUtc === 420) {
                            zone = 2;
                        }
                        else if (minFromUtc === 480) {
                            zone = 3;
                        }
                        else if (minFromUtc === 540) {
                            zone = 4;
                        }
                        else {
                            zone = 5;
                        }
                        select.selectedIndex = zone;
                    }
                    else if (f.id === "timeType") {
                        let jan = new Date(new Date().getFullYear(), 0, 1);
                        let jul = new Date(new Date().getFullYear(), 6, 1);
                        let stdTimeZoneOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
                        let isDst = new Date().getTimezoneOffset() < stdTimeZoneOffset;
                        select.selectedIndex = isDst === false ? 0 : 1;
                    }
                }
                else if (f.optionYear) {
                    let curr = new Date().getFullYear();
                    for (let i = curr - 10; i <= curr + 10; i++) {
                        let option = document.createElement("option");
                        option.innerHTML = ("" + i).length > 1 ? i : "0" + i;

                        select.appendChild(option);
                    }
                    select.selectedIndex = 10;
                }
                else if (f.optionDay) {
                    let max = new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate();
                    for (let i = 1; i <= max; i++) {
                        let option = document.createElement("option");
                        option.innerHTML = ("" + i).length > 1 ? i : "0" + i;

                        select.appendChild(option);
                    }
                    select.selectedIndex = new Date().getDate() - 1;
                }
                else {
                    for (let i = f.optionRange.a; i <= f.optionRange.b; i++) {
                        let option = document.createElement("option");
                        option.innerHTML = ("" + i).length > 1 ? i : "0" + i;

                        select.appendChild(option);
                    }
                    if (f.id === "hour") {
                        let hour = new Date().getHours();
                        if (hour > 12) hour -= 12;
                        select.selectedIndex = hour - 1;
                    }
                    else if (f.id === "minute") {
                        let min = new Date().getMinutes();
                        select.selectedIndex = min;
                    }
                }

                fields.appendChild(select);

                if (f.unit) {
                    let unit = document.createElement("p");
                    unit.innerHTML = f.unit;
                    fields.appendChild(unit);
                }
            });

            card.appendChild(label);
            card.appendChild(fields);

            if (c.buttons) {
                c.buttons.forEach(b => {
                    let button = document.createElement("button");
                    button.id = b.id;
                    button.innerHTML = b.innerHTML;
                    button.onclick = () => {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(useCurrentLongitude);
                        }
                        else {
                            alert("Geolocation is not supported by this browser.")
                        }
                    }
                    fields.appendChild(button);
                });
            }

            input.appendChild(card);
        });

        let resultCard = document.createElement("div");
        resultCard.className = "resultCard";

        let header = document.createElement("div");
        header.className = "header";

        let date = document.createElement("p");
        date.id = "date";

        let time = document.createElement("p");
        time.id = "time";

        resultCard.appendChild(header);
        resultCard.appendChild(date);
        resultCard.appendChild(time);
        //output.appendChild(resultCard);

        container.appendChild(input);
        //container.appendChild(output);
        container.appendChild(resultCard);
        body.appendChild(container);

        calc();
    }

    const useCurrentLongitude = (pos) => {
        let long = pos.coords.longitude * -1;
        if (long < 64) long = 64;
        if (long >= 173) long = 172.9;
        let degree = Math.floor(long);
        let minute = Math.floor((long - degree) * 60);
        document.getElementById("degree").selectedIndex = degree - 64;
        document.getElementById("longitudeMinute").selectedIndex = minute;
        calc();
    }

    const calc = () => {

        let year = parseInt(document.getElementById("year").value);
        let month = parseInt(document.getElementById("month").selectedIndex);
        let day = parseInt(document.getElementById("day").value);
        let meridian = document.getElementById("meridian").value;
        let hour = parseInt(document.getElementById("hour").value);
        let minute = parseInt(document.getElementById("minute").value);
        let fromTime = document.getElementById("fromTime").value;
        let timeZone = document.getElementById("timeZone").value;
        let timeType = document.getElementById("timeType").value;
        let degree = parseInt(document.getElementById("degree").value);
        let longitudeMinute = parseInt(document.getElementById("longitudeMinute").value);

        updateDaysInMonth(year, month, day);

        if (meridian === "AM") {
            if (hour === 12) hour = 0;
        }
        else {
            if (hour !== 12) hour += 12;
        }

        let date = new Date(year, month, day, hour, minute, 0, 0);
        let dstCorrection = timeType === "Standard Time" ? 0 : 60;
        let eot = equationOfTime(bFunction(date));
        let longitudinalCorrection = getLongitudinalCorrection(getLocalSolarTimeMeridian(timeZone), degree + (longitudeMinute / 60.0));
        let timeCorrectionFactor = 0.0;

        if (fromTime === "Clock Time") {
            longitudinalCorrection *= -1;
            timeCorrectionFactor = eot - longitudinalCorrection - dstCorrection;
        }
        else {
            timeCorrectionFactor = -(eot + longitudinalCorrection) + dstCorrection;
        }

        date = addMinutes(date, Math.round(timeCorrectionFactor));

        let header = document.getElementsByClassName("header")[0];
        let dateOutput = document.getElementById("date");
        let timeOutput = document.getElementById("time");

        header.innerHTML = fromTime === "Clock Time" ? "Solar Time" : "Clock Time";
        dateOutput.innerHTML = `${toMonthString(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`;
        timeOutput.innerHTML = `${toTwelveHourClock(date.getHours())}:${addZero(date.getMinutes())} ${date.getHours() < 12 ? "AM" : "PM"}`;
    }

    const addZero = (num) => {
        return ("" + num).length > 1 ? num : "0" + num;
    }

    const updateDaysInMonth = (year, month, day) => {
        let select = document.getElementById("day");
        while (select.children.length > 0) {
            select.removeChild(select.firstChild);
        }
        let max = new Date(year, month + 1, 0).getDate();
        for (let i = 1; i <= max; i++) {
            let option = document.createElement("option");
            option.innerHTML = ("" + i).length > 1 ? i : "0" + i;

            select.appendChild(option);
        }
        day -= 1;
        if (day >= select.options.length) {
            day = select.options.length - 1;
        }
        select.selectedIndex = day;
    }

    const dayOfYear = (date) => {
        let now = date;
        let start = new Date(now.getFullYear(), 0, 0);
        let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        let oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    const totalMinutes = (date) => {
        return (date.getHours() * 60) + date.getMinutes();
    }

    const degToRad = (deg) => {
        return deg * (Math.PI / 180.0);
    }

    const bFunction = (date) => {
        return degToRad(360.0 / 365.0) * (((dayOfYear(date) + (totalMinutes(date) / 1440.0)) - 81.0));
    }

    const equationOfTime = (b) => {
        return (9.87 * Math.sin(2.0 * b)) - (7.53 * Math.cos(b)) - (1.58 * Math.sin(b));
    }

    const getLocalSolarTimeMeridian = (timeZone) => {
        switch (timeZone) {
            case "Eastern":
                return 75.0;
            case "Central":
                return 90.0;
            case "Mountain":
                return 105.0;
            case "Pacific":
                return 120.0;
            case "Alaska":
                return 135.0;
            case "Hawaii-Aleutian":
                return 150.0;
        }
    }

    const getLongitudinalCorrection = (localSolarTimeMeridian, localLongitude) => {
        return 4.0 * (localSolarTimeMeridian - localLongitude);
    }

    const addMinutes = (date, minutes) => {
        return new Date(date.getTime() + minutes * 60000);
    }

    const toMonthString = (int) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[int];
    }

    const toTwelveHourClock = (hours) => {
        if (hours === 0) {
            hours = 12;
        }
        else if (hours > 12) {
            hours -= 12;
        }
        return hours;
    }
}