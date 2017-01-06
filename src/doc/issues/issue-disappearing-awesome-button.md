Sans le height: 75 dans le container, ça disparait

```JS
<View style={ { backgroundColor:"blue", height:75 } }>
  <AwesomeButton />
</View>
```

`AwesomeButton`:

```JS
    <TouchableOpacity style={ { flex: 1 } } activeOpacity={ this.props.activeOpacity } onPress={ onPress }>
      <Animated.View style={ { height: 50, backgroundColor: "orange" } }>
        <InnerButtonView />
      </Animated.View>
    </TouchableOpacity>
```

`InnerButtonView`:

```JS
<View style={ {flexDirection: 'row', alignItems: 'center', alignSelf: 'center'} }>
  <Text style={ { color: "white" } }>{ text }</Text>
</View>
```