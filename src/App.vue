<template>
  <el-config-provider :locale :size="getSize($grid)">
    <Layouts />
    <FileDialog ref="fileDialogRef" />
  </el-config-provider>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { i18n } from '$/locales/index.js'
import localeModel from '$/plugins/element-plus/locale.js'
import FileDialog from '$/components/ControlBar/FileManage/FileDialog/index.vue'
import { useDeviceStore } from '$/store/device/index.js'
import { useStartApp } from '$/hooks/useStartApp/index.js'
import { ElMessage, ElMessageBox } from 'element-plus'

import Layouts from './layouts/index.vue'

const fileDialogRef = ref()
const deviceStore = useDeviceStore()

window.electron.ipcRenderer.on('quit-before', async () => {
  console.log('Received quit-before event')
  ElLoading.service({
    lock: true,
    text: window.t('appClose.quit.loading'),
  })
})

window.electron.ipcRenderer.on('tray:turn-screen-off', async () => {
  console.log('Received tray:turn-screen-off event')
  try {
    const devices = await deviceStore.getList()
    console.log('Devices found:', devices)
    
    if (devices.length > 0) {
      const activeDevice = devices.find(device => device.status === 'device') || devices[0]
      console.log('Active device:', activeDevice)
      if (activeDevice) {
        console.log('Calling window.scrcpy.helper with device:', activeDevice.id)
        await window.scrcpy.helper(activeDevice.id, '--turn-screen-off')
        console.log('Turn screen off command executed')
        ElMessage.success('屏幕已关闭')
      }
    } else {
      console.log('No devices found')
      ElMessage.warning('未找到连接的设备')
    }
  } catch (error) {
    console.error('Error in tray:turn-screen-off handler:', error)
    ElMessage.error('关闭屏幕失败: ' + error.message)
  }
})

window.electron.ipcRenderer.on('tray:open-file-manage', async () => {
  console.log('Received tray:open-file-manage event')
  try {
    // 确保主窗口可见
    window.electron.ipcRenderer.send('show-main-window')
    
    const devices = await deviceStore.getList()
    console.log('Devices found:', devices)
    
    if (devices.length > 0) {
      const activeDevice = devices.find(device => device.status === 'device') || devices[0]
      console.log('Active device:', activeDevice)
      if (activeDevice) {
        console.log('Opening file manage for device:', activeDevice.id)
        fileDialogRef.value.open(activeDevice)
        ElMessage.success('文件管理已打开')
      }
    } else {
      console.log('No devices found')
      ElMessage.warning('未找到连接的设备')
    }
  } catch (error) {
    console.error('Error in tray:open-file-manage handler:', error)
    ElMessage.error('打开文件管理失败: ' + error.message)
  }
})

const startApp = useStartApp()

window.electron.ipcRenderer.on('execute-arguments-change', async (event, params) => {
  console.log('Received execute-arguments-change event with params:', params)
  startApp.open(params)
})

onMounted(() => {
  console.log('App mounted, starting app...')
  startApp.open()
})

const locale = computed(() => {
  const i18nLocale = i18n.global.locale.value

  const value = localeModel[i18nLocale]

  return value
})

showTips()

function getSize(grid) {
  const value = ['sm', 'md'].includes(grid.breakpoint) ? 'small' : 'default'

  return value
}

async function showTips() {
  const { scrcpyPath } = window.electron?.configs || {}

  if (scrcpyPath) {
    return false
  }

  ElMessageBox.alert(
    `<div>
      ${window.t('dependencies.lack.content', {
        name: '<a class="hover:underline text-primary-500" href="https://github.com/Genymobile/scrcpy" target="_blank">scrcpy</a>',
      })}
    <div>`,
    window.t('dependencies.lack.title'),
    {
      dangerouslyUseHTMLString: true,
      confirmButtonText: window.t('common.confirm'),
    },
  )
}
</script>

<style lang="postcss" scoped>
</style>
