import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';

// スタイルを適用したPaperコンポーネントを作成
export const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2), // 周囲の余白
  padding: theme.spacing(2), // 内部の余白
}));

// スタイルを適用したListItemコンポーネントを作成
export const TodoItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 0), // 上下の余白
}));