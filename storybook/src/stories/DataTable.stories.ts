import type { Meta, StoryObj } from '@storybook/react-vite';
import DataTable from '../../components/DataTable';
import Pagination from '../../components/Pagination';
import React, { useState } from 'react';

const meta = {
  title: 'CoreUI/DataTable',
  component: DataTable,
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const columns = [
  { label: 'Name', field: 'name' },
  { label: 'Age', field: 'age' },
  { label: 'Role', field: 'role' },
];

const rows = [
  { name: 'Alice', age: 30, role: 'Developer' },
  { name: 'Bob', age: 25, role: 'Designer' },
  { name: 'Charlie', age: 35, role: 'Manager' },
];

export const Default: Story = {
  args: {
    columns,
    rows,
  },
};

export const WithPagination: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);
    const rowsPerPage = 2;
    const pagedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    return (
      <DataTable
        {...args}
        rows={pagedRows}
        pagination={
          <Pagination
            count={Math.ceil(rows.length / rowsPerPage)}
            page={page}
            onChange={(_, p) => setPage(p)}
          />
        }
      />
    );
  },
  args: {
    columns,
    rows,
  },
};

export const CustomColumns: Story = {
  args: {
    columns: [
      { label: 'Name', field: 'name' },
      { label: 'Role', field: 'role' },
    ],
    rows,
  },
}; 