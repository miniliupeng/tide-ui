#!/bin/bash
COMPONENT=$1

# 转换首字母大写的组件名（用于输出）
COMPONENT_UPPER="$(tr '[:lower:]' '[:upper:]' <<< ${COMPONENT:0:1})${COMPONENT:1}"

# 基础路径
BASE="packages/components/$COMPONENT"
CORE_COMPONENTS="packages/core/components.ts"

# 创建目录结构
mkdir -p $BASE/{src,style,types,test}

# 使用循环和关联数组创建文件
declare -A EXTENSIONS
EXTENSIONS=([src]="vue" [style]="css" [types]="ts" [test]="spec.tsx")

for DIR in "${!EXTENSIONS[@]}"; do
  touch "$BASE/$DIR/$COMPONENT.${EXTENSIONS[$DIR]}"
done

# 创建并写入index.ts内容
cat > $BASE/index.ts << EOF
import $COMPONENT_UPPER from './src/$COMPONENT.vue'
import { withInstall } from '@tide-element/utils'

export const Ti$COMPONENT_UPPER = withInstall($COMPONENT_UPPER)

export default Ti$COMPONENT_UPPER
EOF

# 添加到组件库主入口文件
MAIN_INDEX="packages/components/index.ts"
# 检查是否已存在该导出
if ! grep -q "export \* from './$COMPONENT'" "$MAIN_INDEX"; then
  # 在文件末尾添加导出语句
  echo "export * from './$COMPONENT'" >> "$MAIN_INDEX"
  echo "已将组件添加到 $MAIN_INDEX"
else
  echo "组件 $COMPONENT 已在 $MAIN_INDEX 中导出"
fi

# 处理 core/components.ts 文件
# 检查components.ts文件中是否已导入了该组件
if ! grep -q "Ti$COMPONENT_UPPER" "$CORE_COMPONENTS"; then
  # 更新导入语句添加新组件
  if grep -q "import {.*} from '@tide-element/components'" "$CORE_COMPONENTS"; then
    # 找到最后一个导入的组件后面添加新组件
    sed -i "s/} from '@tide-element\/components'/,\ Ti$COMPONENT_UPPER } from '@tide-element\/components'/" "$CORE_COMPONENTS"
  else
    # 如果没有导入，添加导入语句
    TEMP_FILE=$(mktemp)
    echo "import { Ti$COMPONENT_UPPER } from '@tide-element/components'" > "$TEMP_FILE"
    cat "$CORE_COMPONENTS" >> "$TEMP_FILE"
    mv "$TEMP_FILE" "$CORE_COMPONENTS"
  fi
  
  # 在默认导出数组的末尾添加组件
  TEMP_FILE=$(mktemp)
  awk '
  BEGIN { found = 0; }
  /export default \[/ { found = 1; print; next; }
  /]/ && found == 1 {
    # 找到数组末尾，在右括号前添加新组件
    gsub(/]/, "  Ti'$COMPONENT_UPPER',\n]");
    found = 0;
  }
  { print }
  ' "$CORE_COMPONENTS" > "$TEMP_FILE"
  mv "$TEMP_FILE" "$CORE_COMPONENTS"
  
  echo "已将组件 Ti$COMPONENT_UPPER 添加到 $CORE_COMPONENTS 中的导入和导出"
else
  echo "组件 Ti$COMPONENT_UPPER 已在 $CORE_COMPONENTS 中添加"
fi

echo "组件 $COMPONENT 创建完成"