import { reactive, ref } from "vue";

function useTelegraphScanner() {
  const scanResults = reactive({ list: [] });

  let scanTelegraph = async (req, isSortNeeded, paramNameForSort, sortDirectionString) => {
    scanResults.list.splice(0, scanResults.list.length);
    //let list = [];
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd.toString();
    if (mm < 10) mm = '0' + mm.toString();

    dd = dd.toString();
    mm = mm.toString();

    for (let i = 0; i < 37; i++) {
      let newResult = await ipcRenderer.invoke("scan", { titleValue: req, mm: mm, dd: dd });

      const newScanResults = reactive({ list: [] });

      for (const i of scanResults.list) {
        newScanResults.list.push(i);
      }

      for (const i of newResult.results) {
        newScanResults.list.push(i);
      }

      if (isSortNeeded) {
        newScanResults.list = newScanResults.list.sort((a, b) => {
          if (paramNameForSort == "time") {
            let val1 = (new Date(a[paramNameForSort])).getTime();
            let val2 = (new Date(b[paramNameForSort])).getTime();
            return sortDirectionString == "aToB" ? val1 - val2 : val2 - val1;
          } else {
            return sortDirectionString == "aToB" ? a[paramNameForSort] - b[paramNameForSort] : b[paramNameForSort] - a[paramNameForSort];
          }
        });
        for (const i of newScanResults.list) {
          for (const j of scanResults.list) {
            if (JSON.stringify(i) == JSON.stringify(j)) {
              try {
                scanResults.list.splice(scanResults.list.indexOf(i), 1);
              } catch (error) {

              }
            }
          }
          scanResults.list.push(i);
        }
      } else {
        //scanResults.list.splice(0, scanResults.list.length);
        for (const i of newScanResults.list) {
          for (const j of scanResults.list) {
            if (JSON.stringify(i) == JSON.stringify(j)) {
              try {
                scanResults.list.splice(scanResults.list.indexOf(i), 1);
              } catch (error) {

              }
            }
          }
          scanResults.list.push(i);
        }
        //scanResults.list = newScanResults.list;
        console.log(scanResults.list, newScanResults.list)
      }

      mm = newResult.lastMm;
      dd = newResult.lastDd;
    }


  };

  return { scanResults, scanTelegraph };

}

export { useTelegraphScanner };