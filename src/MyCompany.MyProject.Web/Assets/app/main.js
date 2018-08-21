define(['jquery', 'abp/abp', 'lay!element', 'depend!apiService[abp/abp]', 'depend!scriptService[abp/abp]'], function(
  $,
  abp
) {
  console.log('main loaded');
  return {
    $: $,
    abp: abp
  };
});
