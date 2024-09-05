import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface DevAlertDialog {
  all_app_ids: { [key: string]: number };
  total_mk: number;
}

const DevAlertDialog = ({ all_app_ids, total_mk }: DevAlertDialog) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Todos os APP_IDs</AlertDialogTrigger>
      <AlertDialogContent className="h-4/5 overflow-y-auto w-[93%]">
        <AlertDialogHeader>
          <AlertDialogTitle>Todos os App_IDs</AlertDialogTitle>
          <AlertDialogDescription>
            <ul className="space-y-4">
              {Object.entries(all_app_ids).map(([appId, markup]) => {
                const percentage = (markup / total_mk) * 100;
                return (
                  <li key={appId}>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          ID: {appId}
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
                      <CardContent className="flex flex-col space-y-2">
                        <div className="text-xl font-bold">$ {markup.toFixed(2)}</div>
                        <div className="text-sm text-custom-green">
                          {percentage.toFixed(2)}% do Total
                        </div>
                      </CardContent>
                    </Card>
                  </li>
                );
              })}
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="items-end">
          <AlertDialogAction className="w-full">Fechar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DevAlertDialog;
