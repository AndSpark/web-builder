<template>
	<div id="changeDialog">
		<v-dialog v-model="changeDialogStatus" persistent max-width="400px">
			<v-card>
				<v-toolbar flat color="primary" dark>
					<v-toolbar-title>替换组件</v-toolbar-title>
				</v-toolbar>
				<v-tabs vertical>
					<v-tab v-for="(content, category) in componentsList" :key="category">
						{{ category }}
					</v-tab>
					<v-tab-item v-for="(content, category) in componentsList" :key="category">
						<v-card flat>
							<v-list>
								<v-list-item-group
									@change="selectComponentChange(category, content[$event], $event)"
								>
									<v-list-item
										v-for="(component, index) in content"
										:key="index"
										:disabled="isDisabled(component, category)"
									>
										<template v-slot:default="{ active }">
											<v-list-item-content>
												<v-list-item-title v-text="component.title"></v-list-item-title>
											</v-list-item-content>
											<v-list-item-action>
												<v-icon v-if="!active" color="grey lighten-1" v-text="'mdi-star-outline'">
												</v-icon>
												<v-icon v-else color="yellow darken-3" v-text="'mdi-star'"> </v-icon>
											</v-list-item-action>
										</template>
									</v-list-item>
								</v-list-item-group>
							</v-list>
						</v-card>
					</v-tab-item>
				</v-tabs>
				<v-divider></v-divider>
				<v-sheet class="py-2 pr-4 d-flex ">
					<v-spacer></v-spacer>
					<v-btn
						text
						color="blue darken-1"
						class="mr-5"
						@click="$emit('update:changeDialogStatus', false)"
						>取消</v-btn
					>
					<v-btn text color="blue darken-1" @click="replaceArea">确定</v-btn>
				</v-sheet>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	name: 'changeDialog',
	components: {},
	props: {
		componentsList: Object,
		selectComponentsList: Object,
		changeDialogStatus: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			selectComponent: {},
		}
	},
	computed: {},
	methods: {
		selectComponentChange(category, e, i) {
			this.selectComponent[category] = e
			this.selectComponent.category = category
			this.selectComponent.sort = i
		},
		replaceArea() {
			this.$emit('replaceArea', this.selectComponent)
			this.$emit('update:changeDialogStatus', false)
		},
		isDisabled(Component, category) {
			if (this.selectComponentsList[category].find(v => v.id === Component.id)) {
				return true
			}
			return false
		},
	},
}
</script>

<style lang="scss">
#changeDialog {
}
</style>
