import { redirect } from 'next/navigation';

export const metadata = {
    title: 'Model Explorer',
    description: 'A source-linked catalog of publicly documented model capabilities and architecture details.',
};

export default function Page(): never {
    redirect('/llm/models');
}
