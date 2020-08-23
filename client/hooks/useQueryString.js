// DK: Just fast copy-pasta: https://stackoverflow.com/questions/5060526/postgresql-replace-all-instances-of-a-string-within-text-field
import { useState, useCallback } from "react";
import qs from "query-string";

function useQueryString(key, initialValue, options = {}) {
  const {toQuery = (v) => v, toValue = (q) => q} = options;
  const initVal = getQueryStringValue(key) || initialValue;
  const [value, setValue] = useState((initVal) ? toValue(initVal) : initVal);
  const onSetValue = useCallback(
      newValue => {
        setValue(newValue);
        setQueryStringValue(key, toQuery(newValue));
      },
      [key]
  );

  return [value, onSetValue];
}

export default useQueryString;


// DK: Ugh, it could be just based on window.URL class
const setQueryStringWithoutPageReload = qsValue => {
  if (!process.browser) return;
  const newUrl = window.location.origin + window.location.pathname + qsValue;

  window.history.pushState({ path: newUrl }, "", newUrl);
};

const setQueryStringValue = (key, value, queryString) => {
  if (!process.browser) return;
  if (!queryString) queryString = window.location.search;

  const values = qs.parse(queryString);
  const newQsValue = qs.stringify({...values, [key]: value });
  setQueryStringWithoutPageReload(`?${newQsValue}`);
};

export const getQueryStringValue = (key, queryString) => {
  if (!process.browser) return;
  if (!queryString) queryString = window.location.search;

  const values = qs.parse(queryString);
  return values[key];
};
