import { useState, useEffect } from "react";
import { TestResult } from "~/@types";
import {
  MaxScores,
  MetaTags,
  Result,
  UserTab,
  ResultsChart,
  ActivityCalendar,
} from "~/components";
import {
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export type ContributionValue = {
  date: string;
  count: number;
};

export const Profile = () => {
  const [pastResults, setPastResults] = useState<TestResult[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const theme = useTheme();
  const darkMode = theme.palette.mode === "dark";

  useEffect(() => {
    const savedResults = localStorage.getItem("typingTestResults");
    if (savedResults) {
      const parsedResults = JSON.parse(savedResults);
      setPastResults(parsedResults);
    }
  }, []);

  const generateData = (): ContributionValue[] => {
    const resultsByDate: Record<string, number> = {};
    pastResults.forEach((result) => {
      const date = result.date;
      if (date) {
        resultsByDate[date] = (resultsByDate[date] || 0) + 1;
      }
    });
    return Object.entries(resultsByDate).map(([date, count]) => ({
      date,
      count,
    }));
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const saved = localStorage.getItem("rowsPerPage");
    if (saved) setRowsPerPage(Number(saved));
  }, []);

  const handleRowsPerPageChange = (event: SelectChangeEvent) => {
    const value = parseInt(event.target.value);
    localStorage.setItem("rowsPerPage", value.toString());
    setRowsPerPage(value);
    setPage(1);
  };

  const paginatedResults = pastResults.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalPages = Math.ceil(pastResults.length / rowsPerPage);

  return (
    <div className="py-6 px-[70px] overflow-y-scroll fixed inset-0 dark:bg-gray-200 bg-gray-900">
      <MetaTags
        title="Account | Monkeytype"
        description="Manage your Monkeytype account. View your typing test history, update your profile, and track your progress."
        keywords="Monkeytype account, typing test history, profile settings, typing progress, typing statistics"
      />
      <div className="mt-[85px] gap-[20px] flex items-center justify-between">
        <UserTab />
        <MaxScores pastResults={pastResults} />
      </div>
      <div className="mt-5">
        <ActivityCalendar values={generateData()} />
      </div>

      {pastResults.length > 0 ? (
        <>
          <ResultsChart results={pastResults} />
          <div className="mt-5">
            <Result title="Your Results Table" results={paginatedResults} />
          </div>
          <div className="mt-6 flex flex-col items-center gap-4">
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel
                id="rows-per-page-label"
                sx={{
                  color: darkMode ? "white" : "gray",
                }}
              >
                Rows per page
              </InputLabel>
              <Select
                labelId="rows-per-page-label"
                value={rowsPerPage.toString()}
                label="Rows per page"
                onChange={handleRowsPerPageChange}
                sx={{
                  color: darkMode ? "white" : "gray",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  ".MuiSvgIcon-root": {
                    color: darkMode ? "white" : "gray",
                  },
                }}
              >
                {[5, 10, 25, 50].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              variant="outlined"
              shape="rounded"
              siblingCount={1}
              boundaryCount={1}
              showFirstButton
              showLastButton
              sx={{
                "& .MuiPaginationItem-root": {
                  color: darkMode ? "white" : "gray",
                  borderColor: "gray",
                },
                "& .Mui-selected": {
                  backgroundColor: darkMode ? "#4B5563" : "#cbd5e1",
                  color: darkMode ? "white" : "black",
                },
                "& .MuiPaginationItem-root.Mui-selected:hover": {
                  backgroundColor: darkMode ? "#6B7280" : "#e2e8f0",
                },
              }}
            />
          </div>
        </>
      ) : (
        <p className="text-gray-200 text-[25px] text-center mt-[70px]">
          No past results found. Complete a typing test to see your results
          here!
        </p>
      )}
    </div>
  );
};
