"use client";

import {
  DataTable,
  DataTableExportButton,
  DataTableFilterSelect,
  DataTableSearchInput,
  DataTableToolbar,
} from "@/components/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoadingState } from "@/components/shared/LoadingState";
import { TablePagination } from "@/components/TablePagination";

import {
  BACK_TO_DASHBOARD_LABEL,
  CARD_CONTENT_CLASS,
  COMMUNITY_FILTER_ID,
  COMMUNITY_FILTER_LABEL,
  EMPTY_MESSAGE,
  FILTERED_EMPTY_MESSAGE,
  LIST_ERROR_DESCRIPTION,
  LIST_ERROR_TITLE,
  SEARCH_ARIA_LABEL,
  SEARCH_PLACEHOLDER,
} from "./constants";
import { useAdminMembersTable } from "./useAdminMembersTable";

export function AdminMembersTable() {
  const {
    membersQuery,
    columns,
    rows,
    totalCount,
    loading,
    fetching,
    page,
    pageSize,
    sortColumn,
    sortDirection,
    search,
    communityId,
    communityFilterOptions,
    hasActiveFilters,
    tableExport,
    setPage,
    setPageSize,
    handleSortChange,
    handleSearchChange,
    handleCommunityChange,
  } = useAdminMembersTable();

  if (membersQuery.isPending && rows.length === 0) {
    return <LoadingState resourceName="members" />;
  }

  if (membersQuery.isError) {
    return (
      <ErrorState
        title={LIST_ERROR_TITLE}
        description={LIST_ERROR_DESCRIPTION}
        onRetry={() => membersQuery.refetch()}
        homeHref="/dashboard"
        homeLabel={BACK_TO_DASHBOARD_LABEL}
      />
    );
  }

  return (
    <div className={CARD_CONTENT_CLASS}>
      <DataTableToolbar
        filters={
          <>
            <DataTableSearchInput
              value={search}
              onChange={handleSearchChange}
              placeholder={SEARCH_PLACEHOLDER}
              ariaLabel={SEARCH_ARIA_LABEL}
              disabled={fetching}
            />
            <DataTableFilterSelect
              id={COMMUNITY_FILTER_ID}
              label={COMMUNITY_FILTER_LABEL}
              value={communityId}
              onChange={handleCommunityChange}
              options={communityFilterOptions}
              disabled={fetching}
            />
          </>
        }
        actions={
          <DataTableExportButton
            columns={columns}
            exportConfig={tableExport}
            disabled={totalCount === 0 || fetching}
          />
        }
      />
      <DataTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        loading={loading}
        loadingResourceName="members"
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
        emptyMessage={hasActiveFilters ? FILTERED_EMPTY_MESSAGE : EMPTY_MESSAGE}
      />
      <TablePagination
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        disabled={fetching}
      />
    </div>
  );
}
