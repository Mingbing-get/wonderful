import { SelectGroup, SelectValueType, SelectOptionType } from '../types/select'

export function isSelectGroup<T extends SelectValueType>(option: SelectOptionType<T> | SelectGroup<T>): option is SelectGroup<T> {
  return option.options
}

export function isSelectOption<T extends SelectValueType>(option: SelectOptionType<T> | SelectGroup<T>): option is SelectOptionType<T> {
  return !option.options
}

export function findOptionInGroupsOrOptions<T extends SelectValueType>(
  options: SelectOptionType<T>[] | SelectGroup<T>[],
  value: T
): SelectOptionType<T> | undefined {
  let item: SelectOptionType<T> | undefined

  for (const option of options) {
    if (isSelectGroup(option)) {
      for (const subOption of option.options) {
        if (subOption.value === value) {
          item = subOption
          break
        }
      }

      if (item) break
    } else {
      if (option.value === value) {
        item = option
        break
      }
    }
  }

  return item
}

export function findNextOptionInGroupsOrOptions<T extends SelectValueType>(
  options: SelectOptionType<T>[] | SelectGroup<T>[],
  step: number,
  value?: T
): SelectOptionType<T> | undefined {
  if (options.length === 0) return
  const newOptions: SelectOptionType<T>[] = []

  options.forEach((option) => {
    if (isSelectGroup(option)) {
      newOptions.push(...option.options)
    } else {
      newOptions.push(option)
    }
  })

  let currentIndex = -1
  if (value) {
    currentIndex = newOptions.findIndex((option) => option.value === value)
  }

  currentIndex += step
  if (currentIndex < 0) {
    currentIndex = newOptions.length - 1
  } else if (currentIndex > newOptions.length - 1) {
    currentIndex = 0
  }

  return newOptions[currentIndex]
}
