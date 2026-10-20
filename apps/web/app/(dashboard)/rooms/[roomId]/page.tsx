import RoomCollabView from './RoomCollabView';

export function generateStaticParams() {
  return [
    { roomId: '409' },
    { roomId: 'viberhub-8842f' },
    { roomId: 'mesh' },
    { roomId: 'default' },
  ];
}

export default async function RoomCollabPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  return <RoomCollabView initialRoomId={roomId} />;
}
