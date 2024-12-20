export const EMAIL_REGEX = /^ [\w -\.] + @([\w -] +\.) +[\w -]{ 2, 4 } $/
export const NOT_EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const PHONE_NUMBER_REGEX = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
export const NAME_NOT_INCLUDE_NUMBER_REGEX =
  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÁẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲÝỴỶỸỷỳýỹ\s]+$/

export const INTEGER_NUMBER_REGEX = /^[1-9]\d*$/
