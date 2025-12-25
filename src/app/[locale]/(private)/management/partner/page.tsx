import React from "react";

import BodyBaseLayout from "@/app/_components/layout/BodyBaseLayout";

import AdminView from "./User.view";

const Page = ({ params }: { params: { status: string } }) => {
  return (
    <BodyBaseLayout>
      <AdminView />
    </BodyBaseLayout>
  );
};

export default Page;
