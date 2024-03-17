import { reactive } from "vue";

function useTelegraphScanner() {
  const scanResults = reactive({list: []});

  let scanTelegraph = async (req) => {
    scanResults.list.splice(0, scanResults.list.length);
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    for (let i = 0; i < 37; i++) {
      let newResult = await ipcRenderer.invoke("scan", { titleValue: req, mm: mm, dd: dd });
      for (let j of newResult.results) {
        scanResults.list.push(reactive(j));
      }
      mm = newResult.lastMm;
      dd = newResult.lastDd;
    }
  };

  return { scanResults, scanTelegraph };

}

export { useTelegraphScanner };