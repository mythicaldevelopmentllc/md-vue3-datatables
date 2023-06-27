import DataTable from './Components/DataTable.vue';
import TBody from './Components/TBody.vue';
import TBodyCell from './Components/TBodyCell.vue';
import THead from './Components/THead.vue';
import THeadCell from './Components/THeadCell.vue';
import TRow from './Components/TRow.vue';

export default {
  install:(app, options) => {
    app.component("DataTable", DataTable);
    app.component("TBody", TBody);
    app.component("TBodyCell", TBodyCell);
    app.component("THead", THead);
    app.component("THeadCell", THeadCell);
    app.component("TRow", TRow);
  }
}

export {
  DataTable,
  TBody,
  TBodyCell,
  THead,
  THeadCell,
  TRow
}
