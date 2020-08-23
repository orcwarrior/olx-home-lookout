import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import LOOKOUT_OFFERS_QUERY from "../../gql-queries/lookoutReport.graphql";
import { LookoutReport } from "@components/LookoutReport";
import { withPlainPage } from "../../next-utils";

const ReportPage = withPlainPage(() => {
  const router = useRouter();
  const {uuid} = router.query;
  const defaultWhere = {hash: {_eq: uuid}}

  const {data} = useQuery(LOOKOUT_OFFERS_QUERY, {variables: {where: defaultWhere}})
  // const report = data?.
  console.log(`data: `, data);
  const [{node: report} = {}] = (data?.LookoutReports_connection?.edges || [])


  console.log(`report: `, report);

  return report ? <LookoutReport report={report}/> : null;
})


export default ReportPage;
