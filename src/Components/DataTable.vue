<template>
  <div v-if="showPageSize || showFilter" class="flex justify-between gap-2 px-6">
    <div class="col-span-6 md:col-span-12">
      <PaginationSize
        v-if="showPageSize"
        :options="perPageOptions"
        :value="tableQuery.per_page"
        @onSelectPageSize="handleOnPageSizeChanged"
      />
    </div>
    <div class="col-span-6 md:col-span-12">
      <Filter v-if="showFilter" :search="tableQuery.search" @handleSearch="handleFilterChange" />
    </div>
  </div>

  <Pagination
    v-if="topPagination"
    :total="totalData"
    :perPage="perPage"
    :currentPage="currentPage"
    @onPageSelection="handlePageSelection"
  />

  <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
    <table class="min-w-full border-separate" style="border-spacing: 0">
      <THead>
        <slot name="thead">
          <THeadCell
            v-for="(label, key) in tableColumns"
            :first="key === 0"
            :last="key === tableColumns.length"
            :key="`datatable-thead-th-${key}`"
          >
            {{ label }}
          </THeadCell>
        </slot>
      </THead>

      <TBody>
        <TRow
          v-for="(row, rowIndex) in tableRows"
          :key="`datatable-row-${uniqueId()}-${rowIndex}`"
          :rowIndex="rowIndex"
          :totalRecords="tableRows.length"
        >
          <slot name="tbody" :index="rowIndex" :row="row">
            <TBodyCell
              v-for="(label, key) in tableColumns"
              :key="`datatable-tbody-td-${uniqueId()}-${key}`"
              :rowIndex="rowIndex"
              :totalRecords="tableRows.length"
              :first="parseInt(key) === 0"
            >
              {{ row[key] }}
            </TBodyCell>
          </slot>
        </TRow>

        <TRow v-if="tableRows.length === 0" :rowIndex="0">
          <slot name="empty" />
        </TRow>
      </TBody>
    </table>
  </div>

  <Pagination
    v-if="bottomPagination"
    :total="totalData"
    :perPage="perPage"
    :currentPage="currentPage"
    @onPageSelection="handlePageSelection"
  />
</template>

<script setup>
  import { computed, ref, watch } from 'vue';
  import THead from '@/lib/Datatables/THead.vue';
  import TBody from '@/lib/Datatables/TBody.vue';
  import TRow from '@/lib/Datatables/TRow.vue';
  import THeadCell from '@/lib/Datatables/THeadCell.vue';
  import TBodyCell from '@/lib/Datatables/TBodyCell.vue';
  import Pagination from '@/lib/Datatables/Pagination/Pagination.vue';
  import PaginationSize from '@/lib/Datatables/Pagination/PaginationSize.vue';
  import Filter from '@/lib/Datatables/Filter/Filter.vue';
  import { formatString } from '@/lib/Datatables/utils/helpers';

  const PER_PAGE = 5;

  // eslint-disable-next-line no-undef
  const emit = defineEmits(['loadData']);
  // eslint-disable-next-line no-undef
  const props = defineProps({
    showFilter: {
      type: Boolean,
      default: false,
    },
    showPageSize: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: false,
      default: null,
    },
    pagination: {
      type: Object,
      required: false,
      default: null,
    },
    perPageOptions: {
      type: Object,
      required: false,
      default: () => {
        return [5, 10, 15, 25, 50, 75, 100];
      },
    },
    topPagination: {
      type: Boolean,
      required: false,
      default: true,
    },
    bottomPagination: {
      type: Boolean,
      required: false,
      default: false,
    },
  });

  const tableQuery = ref({
    page: props.pagination?.page || 1,
    search: props.pagination?.search || '',
    per_page: props.pagination?.perPage || PER_PAGE,
    sort: props.pagination?.sort || '',
  });

  const tableColumns = computed(() => {
    if (props.columns) {
      return props.columns;
    }
    if (props.rows.length === 0) {
      return [];
    }
    return Object.keys(props.rows[0]).reduce((cols, key) => ({ ...cols, [key]: formatString(key) }), {});
  });

  const tableRows = computed(() => props.rows);
  const totalData = computed(() => props.pagination?.total || props.rows.length);
  const perPage = computed(() => props.pagination?.perPage || PER_PAGE);
  const currentPage = computed(() => props.pagination?.page || 1);

  const uniqueId = () => Math.floor(Math.random()) * 100;
  const handlePageSelection = (page) => {
    tableQuery.value.page = page;
  };

  const handleOnPageSizeChanged = (size) => {
    tableQuery.value.per_page = parseInt(size.target.value);
  };

  const handleFilterChange = (filter) => {
    tableQuery.value.search = filter;
  };

  const fireLoadData = () => {
    emit('loadData', tableQuery.value);
  };

  fireLoadData();
  watch(
    () => ({ ...tableQuery.value }),
    () => {
      console.log(tableQuery.value);
      fireLoadData();
    },
    {
      deep: true,
    },
  );
</script>
