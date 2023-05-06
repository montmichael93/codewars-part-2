///* https://www.codewars.com/kata/59d582cafbdd0b7ef90000a0 */
function Inspector() {
    let wantedByState = [];
    let wantedSet = new Set();
    let allowingCountries = [];
    const idRequirement = [];
    const outSiderAccessPermit = [];
    let workPassRequirement = [];
    let deniedCountries = [];
    let allowedCountries = [];
    const deniedSet = new Set();
    const allowedSet = new Set();
    let vaxxNotification = [];
    let vaxxList = new Set();
    let vaxxNation = new Set();
    let vaxxRequire = new Set();
    let allEntrantVaxx = new Set();
    let outSideVaxx = new Set();
    let noLongerRequiredVaxx = new Set();
    let totalNations = ['Arstotzka', 'Antegria', 'Impor', 'Kolechia', 'Obristan', 'Republia', 'United Federation']

    this.receiveBulletin = function (bulletin) {
        console.log(bulletin)
        ///////////////WANTED!!!!!!!!!!!
        if (bulletin.includes('Wanted by the State:')) {
            const words = bulletin.split(' ');
            const requireIndex = words.indexOf('State:');
            const firstName = words[requireIndex + 1];
            const lastName = words[requireIndex + 2];
            const fullName = `${firstName} ${lastName}`;
            wantedByState.push(fullName)
        }

        //////////ID CARD!!!!!!!!!!!!!
        if (bulletin.includes('Citizens of Arstotzka require ID card')) {
            idRequirement.push('ID_card')
        }
        //////ACCESS PERMIT!!!!!!!!!!!!!!
        if (bulletin.includes('Foreigners require access permit')) {
            outSiderAccessPermit.push('access_permit')
        }

        ////////////////WORK PASS!!!!!!!!!!!
        if (bulletin.includes('Workers require work pass')) {
            workPassRequirement.push('work_pass')
        }

        //////////ALLOW CITIZENS OF!!!!!!!!!!!!!!!!!!!!!!!! 
        if (bulletin.includes('Allow citizens of')) {
            let allowedNationsRegex = /Allow citizens of .*/g;
            allowedCountries.length = 0;
            let allowedNations = bulletin.match(allowedNationsRegex)[0].substring(16).replaceAll('f ', '').split(',').map(allowedCountries => allowedCountries.trim());
            allowedCountries.push(allowedNations)
            allowedCountries = allowedCountries.flatMap(x => x);
            for (let i = 0; i < allowedCountries.length; i++) {
                if (allowedCountries[i] === 'UnitedFederation') {
                    allowedCountries[i] = allowedCountries[i].replace('d', 'd ')
                }
            }
            allowedCountries.forEach(item => {
                allowedSet.add(item);
                deniedSet.delete(item)
            });

        }
        //////CITIZENS DENIED!!!!!!!!!!!!!!!!!!!!!!!

        if (bulletin.includes('Deny citizens of')) {
            let bannedNationsRegex = /Deny citizens of .*/g;
            deniedCountries.length = 0;
            let bannedNations = bulletin.match(bannedNationsRegex)[0].substring(16).split(',').map(deniedCountries => deniedCountries.trim());
            deniedCountries.push(bannedNations)
            deniedCountries = deniedCountries.flatMap(x => x);
            for (let i = 0; i < deniedCountries.length; i++) {
                if (deniedCountries[i] === 'UnitedFederation') {
                    deniedCountries[i] = deniedCountries[i].replace('d', 'd ')
                }
            }
            deniedCountries.forEach(item => {
                allowedSet.delete(item)
                deniedSet.add(item);
            });
        }




        ////////////////VAX NO LONGER REQUIRED!!!!!!!!!!!!!!!!!
        if (bulletin.includes('no longer')) {
            let noLongerRequiredVaxxination = bulletin.split('\n')
                .filter(line => line.includes('vaccination') && line.includes('no longer require'))
                .join(' ');
            noLongerRequiredVaxxination = noLongerRequiredVaxxination.replaceAll(',', '').split(' ')
            noLongerRequiredVaxxination.forEach(item => {
                noLongerRequiredVaxx.add(item)
                if (noLongerRequiredVaxx.has("United") && noLongerRequiredVaxx.has("Federation")) {
                    noLongerRequiredVaxx.delete("United")
                    noLongerRequiredVaxx.delete("Federation")
                    noLongerRequiredVaxx.add('United Federation')
                }
            });
            noLongerRequiredVaxx.forEach(item => {
                if (totalNations.includes(item)) {
                    noLongerRequiredVaxx.delete(item)
                }
                if (item === 'Entrants') {
                    allEntrantVaxx.delete('Entrants')
                    noLongerRequiredVaxx.delete('Entrants')
                }
                if (item === 'Foreigners') {
                    outSideVaxx.delete('Foreigners')
                    noLongerRequiredVaxx.delete('Foreigners')
                }
                if (item === 'Citizens') {
                    vaxxNation.delete(item)
                    noLongerRequiredVaxx.delete('Citizens')
                    noLongerRequiredVaxx.delete('of')
                }
                if (vaxxNation.has(item)) {
                    vaxxNation.delete(item)
                }
                noLongerRequiredVaxx.delete('no')
                noLongerRequiredVaxx.delete('longer')
                noLongerRequiredVaxx.delete('require')
                noLongerRequiredVaxx.delete("vaccination")
            });
        }
        if (noLongerRequiredVaxx.has('yellow') && noLongerRequiredVaxx.has('fever')) {
            noLongerRequiredVaxx.delete('yellow')
            noLongerRequiredVaxx.delete('fever')
            noLongerRequiredVaxx.add('yellow fever')
        }
        if (noLongerRequiredVaxx.has('hepatitis') && noLongerRequiredVaxx.has('B')) {
            noLongerRequiredVaxx.delete('hepatitis')
            noLongerRequiredVaxx.delete('B')
            noLongerRequiredVaxx.add('hepatitis B')
        }
        for (const item of noLongerRequiredVaxx) {
            vaxxList.delete(item)
        }
        for (const item of vaxxList) {
            //console.log('required ' + item)
        }
        for (const item of noLongerRequiredVaxx) {
            //console.log('no longer required ' + item)
        }

        /////////////VAXXXX!!!!!!!!!!!!!!!!!!!!!!!       
        if (bulletin.includes('vaccination')) {
            let vaccinationLine = bulletin.split('\n')
                .filter(line => line.includes('vaccination') && !line.includes('no longer require'))
                .join(' ');
            vaccinationLine = vaccinationLine.replaceAll(',', '').split(' ')
            if (vaccinationLine.includes('Federation')) {
                vaccinationLine.push('United Federation')
            }
            vaccinationLine.forEach(item => {
                vaxxList.add(item)
                if (totalNations.includes(item)) {
                    vaxxNation.add(item);
                    vaxxList.delete(item)
                    vaxxList.delete('Citizens')
                    vaxxList.delete('of')
                }
                if (item === 'Entrants') {
                    allEntrantVaxx.add(item)
                    vaxxList.delete(item)
                }
                if (item === "Foreigners") {
                    outSideVaxx.add(item)
                    vaxxList.delete(item)
                }
                vaxxList.delete('require')
                vaxxList.delete('vaccination')
                vaxxList.delete(' ')
            });
        }
        if (vaxxList.has("United") && vaxxList.has("Federation")) {
            vaxxList.delete("United")
            vaxxList.delete("Federation")
        }
        if (vaxxList.has('yellow') && vaxxList.has('fever')) {
            vaxxList.delete('yellow')
            vaxxList.delete('fever')
            vaxxList.add('yellow fever')
        }
        if (vaxxList.has('hepatitis') && vaxxList.has('B')) {
            vaxxList.delete('hepatitis')
            vaxxList.delete('B')
            vaxxList.add('hepatitis B')
        }

    }








    this.inspect = function (entrant) {
        const idType = [];
        const idNumbers = [];
        const expiration = [];
        const expired = [];
        const nation = [];
        let vaxx = [];
        const diplomaticAcess = [];
        let visitPurpose = [];
        const entrantName = [];
        const entrantNameFormat = [];

        for (const item in entrant) {
            idType.push(item)
            console.log(entrant[item])
            //////////ID NUMBERS!!!!!!!!!!!!!!!!!
            function getIDNumbers(objectString) {
                const lines = objectString.split('\n');
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    if (line.includes('ID#:')) {
                        const idNumber = line.split('ID#: ')[1];
                        idNumbers.push(idNumber);
                    }
                }
                return idNumbers
            }
            getIDNumbers(entrant[item])
            ////////////ENTRANT NAME!!!!!!!!!!!!!!!!!1
            function getNames(objectString) {
                const lines = objectString.split('\n');
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    if (line.includes('NAME:')) {
                        const entrantFullName = line.split('NAME: ')[1];
                        entrantName.push(entrantFullName);
                    }
                }
                return entrantName
            }
            getNames(entrant[item])
            //////////////ENTRANT NATIONALITY!!!!!!!!!!!!
            function getNation(objectString) {
                const lines = objectString.split('\n');
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    if (line.includes('NATION:')) {
                        const entrantNation = line.split('NATION: ')[1];
                        nation.push(entrantNation);
                    }
                }
                return nation
            }
            getNation(entrant[item])

            ///////////////FORMAT NAME!!!!!!!!!!!!!!!!!!!
            function formatName(name) {
                const [last, first] = name.split(',').map(str => str.trim());
                return `${first} ${last}`;
            }
            let formattedName = formatName(entrantName[0]);
            entrantNameFormat.push(formattedName)
            ///////////////////EXPERATION DATE!!!!!!!!!!!!!!!!!!!!!
            function getExp(objectString) {
                const lines = objectString.split('\n');
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    if (line.includes('EXP:')) {
                        const documentExpDate = line.split('EXP: ')[1];
                        expiration.push(documentExpDate);
                    }
                }
                return expiration
            }

            getExp(entrant[item])

            /////////////////////////DIPLOMATIC STATUS!!!!!!!!!!!!!!!!!!!!!!!

            function diplomaticStatus(objectString) {
                const lines = objectString.split('\n');
                // diplomaticAcess.length = 0
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    if (line.includes('ACCESS: ')) {
                        let diplomaticness = line.split('ACCESS: ')[1];
                        diplomaticAcess.push(...diplomaticness.split(',').map(str => str.trim()));
                    }
                }
                return diplomaticAcess
            }


            diplomaticStatus(entrant[item])

            ////////////////////////VAXXX STATUS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!       
            function getVaxxed(objectString) {
                const lines = objectString.split('\n');
                //vaxx.length = 0;
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    if (line.includes('VACCINES:')) {
                        const documentVaxx = line.split('VACCINES: ')[1];
                        vaxx.push(documentVaxx);
                        vaxx = vaxx[0].split(',')
                        vaxx = vaxx.flatMap(vax => vax).map(str => str.trim());
                    }
                }
                return vaxx
            }

            getVaxxed(entrant[item])

            //////////////////////////VISIT PURPOSE!!!!!!!!!!!!!!!!!!!!!!!!
            function getPurpose(objectString) {
                const lines = objectString.split('\n');
                //visitPurpose.length = 0;
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    if (line.includes('PURPOSE:')) {
                        const documentPurpose = line.split('PURPOSE: ')[1];
                        visitPurpose.push(documentPurpose);
                        //console.log(visitPurpose)
                        //visitPurpose = visitPurpose[0].split(',')
                        //visitPurpose = visitPurpose.flatMap(vax => vax).map(str => str.trim());


                    }
                }
                return visitPurpose
            }

            getPurpose(entrant[item])



        }
        ////////////////DOCUMENTS EXPIRED!!!!!!!!!!!!!!!!!!
        const expireDate = "1982.11.22";

        function isEarlierDate(date1, date2) {
            const [year1, month1, day1] = date1.split(".");
            const [year2, month2, day2] = date2.split(".");
            const date1Obj = new Date(year1, month1 - 1, day1);
            const date2Obj = new Date(year2, month2 - 1, day2);
            return date1Obj < date2Obj;
        }

        for (let i = 0; i < expiration.length; i++) {
            const result = isEarlierDate(expiration[i], expireDate);
            expired.push(result);
        }

        /////////////////////ENTRANT OBJECT!!!!!!!!!!!!!!!!!!!!!!
        const entrantizen = {
            wantedByState,
            idType,
            idNumbers,
            expiration,
            expired,
            nation,
            vaxx,
            diplomaticAcess,
            visitPurpose,
            entrantName: entrantNameFormat,
        };

        //console.log(entrantizen)
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (wantedByState.includes(entrantNameFormat[0]) && (!wantedSet.has(entrantNameFormat[0]))) {
            wantedSet.add(entrantNameFormat[0])
            return 'Detainment: Entrant is a wanted criminal.'
        }




        if (idNumbers.length > 1) {
            const firstEntry = idNumbers[0];
            for (const item of idNumbers) {
                if (firstEntry !== item) {
                    return 'Detainment: ID number mismatch.'
                }
            }
        }
        if (!entrantizen.idType.includes('passport')) {
            return 'Entry denied: missing required passport.'
        }





        if (nation.length > 1) {
            const firstEntry = nation[0];
            for (const item of nation) {
                if (firstEntry !== item) {
                    return 'Detainment: nationality mismatch.'
                }
            }
        }

        if (entrantizen.expired.includes(true)) {
            let expiredDocs = entrantizen.expired.indexOf(true)
            return `Entry denied: ${idType[expiredDocs].split('_').join(' ')} expired.`
        }


        if (deniedSet.has(entrantizen.nation[0])) {
            return 'Entry denied: citizen of banned nation.'
        }



        if (entrantizen.nation.includes('Arstotzka') && idRequirement.length > 0 && (!entrantizen.idType.includes(idRequirement[0]))) {
            return 'Entry denied: missing required ID card.'
        }


        if (outSiderAccessPermit[0] === 'access_permit' && (!entrantizen.idType.includes('access_permit'))
            && (!entrantizen.idType.includes('grant_of_asylum'))
            && (!entrantizen.idType.includes('diplomatic_authorization') && entrantizen.nation[0] != 'Arstotzka')) {
            return 'Entry denied: missing required access permit.'
        }



        if ((!entrantizen.nation.includes('Arstotzka')) && (!entrantizen.idType.includes('access_permit'))) {
            if (entrantizen.idType.includes('diplomatic_authorization') && (!entrantizen.diplomaticAcess.includes('Arstotzka'))) {
                return 'Entry denied: invalid diplomatic authorization.'
            }
        }



        if (vaxxNation.has(entrantizen.nation[0])) {
            if (!entrantizen.idType.includes('certificate_of_vaccination')) {
                return 'Entry denied: missing required certificate of vaccination.'
            } else {
                for (const item of vaxxList) {
                    if (!entrantizen.vaxx.includes(item)) {
                        return 'Entry denied: missing required vaccination.'
                    }
                }
            }
        }



        if (allEntrantVaxx.has('Entrants')) {
            if (!entrantizen.idType.includes('certificate_of_vaccination')) {
                //console.log('Entrants ' + entrantizen.idType)
                //console.log('Entrants ')
                return 'Entry denied: missing required certificate of vaccination.'
            } else {
                for (const item of vaxxList) {
                    if (!entrantizen.vaxx.includes(item)) {
                        return 'Entry denied: missing required vaccination.'
                    }
                }
            }
        }




        if (allEntrantVaxx.has('Entrants') && entrantizen.nation[0] === 'Arstotzka') {
            if (!entrantizen.idType.includes('certificate_of_vaccination')) {
                //console.log('Entrants ' + entrantizen.idType)

                return 'Entry denied: missing required certificate of vaccination.'
            } else {
                for (const item of vaxxList) {
                    if (!entrantizen.vaxx.includes(item)) {
                        return 'Entry denied: missing required vaccination.'
                    }
                }
            }
        }





        if (outSideVaxx.has('Foreigners') && entrantizen.nation[0] != 'Arstotzka') {
            if (!entrantizen.idType.includes('certificate_of_vaccination')) {
                return 'Entry denied: missing required certificate of vaccination.'
            } else {
                for (const item of vaxxList) {
                    if (!entrantizen.vaxx.includes(item)) {
                        return 'Entry denied: missing required vaccination.'
                    }
                }
            }
        }










        for (const item of noLongerRequiredVaxx) {
            //console.log('no longer required ' + item)
        }




        for (const item of vaxxList) {
            //console.log('required ' + item)
        }





        if (workPassRequirement.includes('work_pass') && entrantizen.visitPurpose[0] === 'WORK' && (!entrantizen.idType.includes('work_pass'))) {


            return 'Entry denied: missing required work pass.'
        }


        if (entrantizen.nation[0] === 'Arstotzka' && idRequirement.length === 0 && (allEntrantVaxx.has('Entrants'))) {

            return 'Glory to Arstotzka.'
        }

        if (entrantizen.nation[0] === 'Arstotzka' && entrantizen.idType.includes(idRequirement[0])) {
            return 'Glory to Arstotzka.'
        }



        if (entrantizen.nation[0] === 'Arstotzka') {
            //console.log(entrantizen)
            return 'Glory to Arstotzka.'
        }






        allowedSet.forEach(item => {
            //console.log('Allowed ' + item)
        });

        deniedSet.forEach(item => {
            //console.log('Denied ' + item);
        });





        if (allowedSet.has(entrantizen.nation[0])) {
            return 'Cause no trouble.';
        }

        if (deniedSet.has(entrantizen.nation[0])) {
            return 'Entry denied: citizen of banned nation.'
        }


        if (!allowedSet.has(entrantizen.nation[0])) {
            return 'Entry denied: citizen of banned nation.'
        }





    }






}







//code your methods
// use Node v18.x