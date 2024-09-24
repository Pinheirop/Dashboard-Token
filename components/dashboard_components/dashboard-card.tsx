"use client"
import * as React from "react"

function DashboardCard(
    idTitle,
    currentMonthCommission,
    previousMonthCommission,
    todaysCommission,
    customDateComissions,
    customDateActiveTraders
) {
        
    <Card className="shrink w-48 md:w-72">
    <CardHeader className="items-start space-y-0">
    <CardTitle className="text-lg font-large">
    ID: 8127382713
    </CardTitle>
    </CardHeader> 
    </Card>
    <div
    className={`grid gap-2 grid-cols-3`}
    >
    <div
    className={`grid gap-2 grid-cols-1`}
    >
    <Card>
    <CardHeader className="items-start space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
        Comissão de {currentMonthName()} 
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
    <CardHeader className="items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
        Comissão Do Dia
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
            Traders ativos hoje: {todaysActiveTraders}
        </p>
        )}
    </CardContent>
    </Card>
    <Card>
    <CardHeader className="items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
        Comissão do Último Mês
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
    </CardContent>
    </Card>
    <div className={`${isCheckedClicked ? "block" : "hidden"}`}>
    <Card>
        <CardHeader className="items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
            Comissão de Data Personalizada
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
            Traders ativos: {customDateActiveTraders}
            </p>
        )}
        </CardContent>
    </Card> 
    </div>
    </div>
    <div className="flex col-span-2">
    <Card className="w-full">
        <CardHeader>
        <CardTitle>Visão Geral A</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
        <Overview />
        </CardContent>
    </Card>
    </div>
    </div>
}