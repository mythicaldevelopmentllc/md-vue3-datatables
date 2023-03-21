import DataTable from './components/DataTable.vue';
import TBody from './components/TBody.vue';
import TBodyCell from './components/TBodyCell.vue';
import THead from './components/THead.vue';
import THeadCell from './components/THeadCell.vue';
import TRow from './components/TRow.vue';

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
