export const getProvinces = async () => {
  const res = await fetch("https://esgoo.net/api-tinhthanh/1/0.htm");
  const data = await res.json();
  return data;
};

export const getDistricts = async (provinceCode) => {
  const res = await fetch(
    `https://esgoo.net/api-tinhthanh/2/${provinceCode}.htm`
  );
  const data = await res.json();
  return data;
};

export const getWards = async (districtCode) => {
  const res = await fetch(
    `https://esgoo.net/api-tinhthanh/3/${districtCode}.htm`
  );
  const data = res.json();
  return data;
};
