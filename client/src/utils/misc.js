function roundDown(num) {
  if (num) {
    return Math.floor(num);
  }
  return 0;
}

function resultsToOptions(results, valueName, idName = 'id') {
  if (results && results.length > 0) {
    return results.map(result => ({ label: result[valueName], value: result[idName] }));
  }
  return [];
}

export { roundDown, resultsToOptions };
