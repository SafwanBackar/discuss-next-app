'use client';
import { Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import * as actions from '@/actions'
function SearchInput() {
    const searchParam = useSearchParams()
  return (
    <form action={actions.search}>
        <Input name="term" defaultValue={searchParam.get('term') || ''}/>
    </form>
  )
}

export default SearchInput