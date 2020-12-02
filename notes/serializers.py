from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        read_only=True,
        default=serializers.CurrentUserDefault()
    )
    tag = serializers.ChoiceField(choices=Note.TAG_CHOICES, default="none")

    def validate_user(self, user):
        if user != serializers.CurrentUserDefault():
            raise serializers.ValidationError(
                'Unable to validate user.'
            )

    class Meta:
        model = Note
        fields = ('id', 'user', 'title', 'content', 'tag', 'date_created', 'visible')
        read_only_fields=('user',)