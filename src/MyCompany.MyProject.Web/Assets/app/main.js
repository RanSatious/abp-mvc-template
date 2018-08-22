define(['jquery', 'abp/abp', 'depend!apiService[abp/abp]', 'depend!scriptService[abp/abp]', 'lay!element'], function(
  $,
  abp
) {
  console.log('main loaded');
  return {
    $: $,
    abp: abp
  };
});
