"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/dashboard_components/date-range-picker";
import { Overview } from "@/components/dashboard_components/overview";
import {
  authorizeAPI,
  getPreviousMonthCommission,
  getTodaysCommission,
  getThisMonthCommissions,
  customDateCommissionCheck,
} from "@/utils/ws_functions";
import { currentMonthName } from "@/utils/time";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode_toggle";
import { LogOut } from "lucide-react";

function Dashboard() {
  const [previousMonthCommission, setPreviousMonthCommissiont] = useState({
    amount: 0,
    payment_status: "pending",
  });
  const [todaysCommission, setTodaysCommission] = useState(0);
  const [todaysActiveTraders, setTodayActiveTraders] = useState(0);
  const [thisMonthCommissions, setThisMonthCommissions] = useState(0);
  const [customDateComissions, setCustomDateComissions] = useState(0);
  const [customDateActiveTraders, setCustomDateActiveTraders] = useState(0);
  const [isCheckedClicked, setIsCheckedClicked] = useState(false);
  const isMobile = window.innerWidth <= 780;

  useEffect(() => {
    authorizeAPI().then(async () => {
      getPreviousMonthCommission().then((commission) => {
        if (typeof commission === "undefined") {
          setPreviousMonthCommissiont({
            amount: -1,
            payment_status: "pending",
          });
          return;
        }

        const { toBepaid, isPaid } = commission;
        setPreviousMonthCommissiont({
          amount: toBepaid,
          payment_status: isPaid,
        });
      });
      getTodaysCommission().then((commission) => {
        if (typeof commission === "undefined") {
          setTodaysCommission(-1);
          return;
        }
        setTodaysCommission(commission.total_mk);
        setTodayActiveTraders(commission.active_traders);
      });
      getThisMonthCommissions().then((commission) => {
        if (typeof commission === "undefined") {
          setThisMonthCommissions(-1);
          return;
        }
        setThisMonthCommissions(commission);
      });
    });
  }, []);

  const checkCustomCommission = () => {
    setIsCheckedClicked(true);
    authorizeAPI().then(async () => {
      customDateCommissionCheck().then((commission) => {
        setCustomDateComissions(commission!.total_mk);
        setCustomDateActiveTraders(commission!.active_traders);
      });
    });
  };

  return (
    <>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div
            className={`${
              isMobile && "top_bar"
            } flex flex-row items-center justify-between space-y-2`}
          >
            {isMobile ? (
              <div className="flex items-center justify-between w-full">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">
                    Dashboard
                  </h2>
                  <span className="text-xs">developed by D-APOLLO</span>
                </div>
                <div className="flex gap-4 items-center">
                  <ModeToggle />
                  <LogOut
                    className="cursor-pointer"
                    onClick={() => {
                      window.localStorage.clear();
                      location.reload();
                    }}
                  />
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <span className="text-xs">developed by D-APOLLO</span>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button onClick={() => checkCustomCommission()}>Check</Button>
              {!isMobile && (
                <div className="flex gap-4 items-center">
                  <ModeToggle />
                  <LogOut
                    className="cursor-pointer"
                    onClick={() => {
                      window.localStorage.clear();
                      location.reload();
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div
                className={`grid gap-4 md:grid-cols-2 lg:${
                  isCheckedClicked ? "grid-cols-4" : "grid-cols-3"
                }`}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {currentMonthName()} Commission
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {thisMonthCommissions === 0 ? (
                        <Skeleton className="h-[30px] w-[150px] rounded-[4px]" />
                      ) : thisMonthCommissions === -1 ? (
                        "0"
                      ) : (
                        `$ ${thisMonthCommissions.toFixed(2)}`
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Today's Commission
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {todaysCommission === 0 ? (
                        <Skeleton className="h-[30px] w-[150px] rounded-[4px]" />
                      ) : todaysCommission === -1 ? (
                        "0"
                      ) : (
                        `$ ${
                          typeof todaysCommission !== "undefined"
                            ? todaysCommission.toFixed(2)
                            : 0
                        }`
                      )}
                    </div>

                    {todaysActiveTraders > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Today active traders: {todaysActiveTraders}
                      </p>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Last Month Commission
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {previousMonthCommission.amount === 0 ? (
                        <Skeleton className="h-[30px] w-[150px] rounded-[4px]" />
                      ) : previousMonthCommission.amount === -1 ? (
                        "0"
                      ) : (
                        `$ ${
                          typeof previousMonthCommission.amount !== "undefined"
                            ? previousMonthCommission.amount.toFixed(2)
                            : 0
                        }`
                      )}
                    </div>

                    {previousMonthCommission.amount === 0 ? (
                      <Skeleton className="h-[30px] w-[150px] rounded-[4px]" />
                    ) : previousMonthCommission.amount === -1 ? (
                      <h5 className="text-sm bg-red-500 w-[24%] rounded p-[3px] my-1">
                        no pending payout
                      </h5>
                    ) : previousMonthCommission.payment_status === "paid" ? (
                      <h5
                        className={`text-sm bg-primary ${
                          isMobile ? "w-[60%]" : "w-[24%]"
                        } rounded p-[3px] my-1`}
                      >
                        Commission Paid
                      </h5>
                    ) : (
                      <h5
                        className={`text-sm bg-blue-400 ${
                          isMobile ? "w-[60%]" : "w-[24%]"
                        } rounded p-[3px] my-1`}
                      >
                        Payout Pending
                      </h5>
                    )}
                  </CardContent>
                </Card>
                <div className={`${isCheckedClicked ? "block" : "hidden"}`}>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Custom Date Commission
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {customDateComissions === 0 ? (
                          <Skeleton className="h-[30px] w-[150px] rounded-[4px]" />
                        ) : customDateComissions === -1 ? (
                          "0"
                        ) : (
                          `$ ${customDateComissions.toFixed(2)}`
                        )}
                      </div>

                      {customDateActiveTraders > 0 && (
                        <p className="text-xs text-muted-foreground">
                          active traders: {customDateActiveTraders}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="flex justify-center">
                <Card className={`col-span-4 ${isMobile ? "w-full" : "w-3/4"}`}>
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
