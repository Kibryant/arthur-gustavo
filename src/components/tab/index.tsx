import { AnimatePresence, motion } from 'framer-motion'
import { CreatePostTab } from '../create-post-tab'
import { OverviewTab } from '../overview-tab'
import { PostsTab } from '../posts-tab'
import { SettingsTab } from '../settings-tab'
import { StatsTab } from '../stats-tab'
import { TasksTab } from '../tasks-tab'

interface TabProps {
  activeTab:
    | 'overview'
    | 'posts'
    | 'stats'
    | 'settings'
    | 'create-post'
    | 'tasks'
}

export function Tab({ activeTab }: TabProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'posts' && <PostsTab />}
        {activeTab === 'stats' && <StatsTab />}
        {activeTab === 'settings' && <SettingsTab />}
        {activeTab === 'create-post' && <CreatePostTab />}
        {activeTab === 'tasks' && <TasksTab />}
        {/* {activeTab === 'create-task' && <CreateTaskTab />} */}
      </motion.div>
    </AnimatePresence>
  )
}
